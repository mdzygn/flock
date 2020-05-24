import { MESSAGE_SYNC_DEBUG } from '../../server/config';

import {
	init,
	response,
	errorResponse,
	validateCredentials,
} from '../../server/mongo';

export async function post(req, res, next) {
    const { db, client } = await init();

	const options = req.body;

	if (!options.userId) {
		response(res, {messages: []});
		return
	}

	if (!await validateCredentials(db, options)) {
		errorResponse(res, {invalid: true}, {errorMsg: 'invalid credentials'});
		return;
    }

	const conversationId = options && options.conversationId;
	const getUnloaded = options && options.getUnloaded;
	const preload = options && options.preload;
	const userId = options && options.userId;
	// let loadedAt = options && options.loadedAt;

	if (!conversationId) {
		errorResponse(res, {}, {errorMsg: 'conversationId not set'});
		return;
	}

	const curConversation = await db.collection('conversations').findOne({ id: conversationId });
	if (!curConversation) {
		errorResponse(res, {}, {errorMsg: 'conversation not found'});
		return;
	}
	if (!curConversation.userIds.includes(userId)) {
		errorResponse(res, {}, {errorMsg: 'conversation doesn\'t include user'});
		return;
	}

	const getMessagesFilter = {};
	getMessagesFilter.conversationId = conversationId;

	if (getUnloaded) {
		getMessagesFilter.userId = { "$ne": userId };
		getMessagesFilter['loaded'] = {
			"$not": { $in: [userId] }
				// "$elemMatch": {
				// 	userId: true,
				// }
			// }
		};
	}

	const sort = {
		createdAt: 1
	};

	let messages = null;

	let messageUpdateAction = null;
	let messageUpdateFilter = null;

	let viewedAtTime = null;

	// if (!preload) {
	// 	viewedAtTime = (new Date()).getTime();

	// 	const conversationsFilter = {
	// 		id: conversationId,
	// 		"users.id": userId,
	// 	};
	// 	const newValues = {
	// 		"users.$.viewedAt" : viewedAtTime,
	// 	};

	// 	// console.log('getMessages ' + conversationId + ' ' + userId + ' viewedAtTime: ' + viewedAtTime);

	// 	// const conversationUpdateResult = await db.collection('conversations').updateMany(conversationsFilter, { $set: newValues });
	// 	// if (!conversationUpdateResult) {
	// 	// 	errorResponse(res, {}, {errorMsg: 'can\'t update conversation(s)', errorObject: conversationUpdateResult});
	// 	// }
	// }

	// const session = client.startSession();
	// const transactionOptions = {
	// 	readPreference: 'primary',
	// 	readConcern: { level: 'local' },
	// 	writeConcern: { w: 'majority' }
	// };

	// try {
	// 	let abortError = null;

	// 	const transactionResults = await session.withTransaction(async () => {
	// 		try {

			const conversationsFilter = {
				id: conversationId,
				"users.id": userId,
			};
			const conversationUpdateValues = {};
			// const conversationUpdateValues = {
			// 	"users.$.viewedAt" : viewedAtTime,
			// };

			messageUpdateFilter = getMessagesFilter;
			messageUpdateAction = {
				'$addToSet': { loaded: userId },
			};

			const requestId = Math.floor(Math.random() * 99999);
			if (!preload) {
				viewedAtTime = (new Date()).getTime();
			}

			conversationUpdateValues["users.$.viewedAt"] = viewedAtTime;

			// if (messages && messages.length) {
				// 	const messageSet = messages.filter((message) => message.userId !== userId);
				// 	const messageIds = messageSet.map((message) => message.id);

				// messageUpdateFilter = JSON.parse(JSON.stringify(getMessagesFilter));
				// messageUpdateFilter.id = { $in: messageIds };

				// messageUpdateFilter = getMessagesFilter;

				// messageUpdateAction = {
				// 	'$addToSet': { loaded: userId },
				// };

				// console.log('getMessages ' + requestId + ' update messages: ' + conversationId + ' ' + userId);
				// db.collection('messages').updateMany(messageUpdateFilter, messageUpdateAction, { session });

				// console.log('update messages: ' + conversationId + ' ' + userId + ' ' + messages.length + ' ' + id);
				// const messageUpdateResult = await db.collection('messages').updateMany(messageUpdateFilter, messageUpdateAction);
				// if (!messageUpdateResult) {
				// 	abortError = {errorMsg: 'error updating message load states'};
				// 	await session.abortTransaction();
				// 	return;
				// }
			// }

			if (!preload) {
				if (MESSAGE_SYNC_DEBUG) console.log('getMessages ' + requestId + ' getMessages ' + conversationId + ' ' + userId + ' viewedAtTime: ' + viewedAtTime);

				db.collection('conversations').updateMany(conversationsFilter, { $set: conversationUpdateValues }); // , { session }
				// const conversationUpdateResult = await db.collection('conversations').updateMany(conversationsFilter, { $set: conversationUpdateValues });
				// if (!conversationUpdateResult) {
				// 	abortError = {errorMsg: 'error updating conversation viewed state'};
				// 	await session.abortTransaction();
				// 	return;
				// }
			}

			if (MESSAGE_SYNC_DEBUG) console.log('getMessages ' + requestId + ' get messages: ' + conversationId + ' ' + userId + ' ' + (new Date()).getTime());
			messages = await db.collection('messages').find(getMessagesFilter).sort(sort).toArray(); // , { session }

			if (MESSAGE_SYNC_DEBUG) console.log('getMessages ' + requestId + ' new messages: ' + conversationId + ' ' + userId + ' count: ' + messages.length);

			if (messages && messages.length) {
				const messageSet = messages.filter((message) => message.userId !== userId);
				const messageIds = messageSet.map((message) => message.id);

				messageUpdateFilter = JSON.parse(JSON.stringify(getMessagesFilter));
				messageUpdateFilter.id = { $in: messageIds };

				if (MESSAGE_SYNC_DEBUG) console.log('getMessages ' + requestId + ' update messages: ' + conversationId + ' ' + userId);
				db.collection('messages').updateMany(messageUpdateFilter, messageUpdateAction); // , { session }
			}

			if (!messages) {
				// abortError = {errorMsg: 'error getting messages'};
				errorResponse(res, {}, abortError || {errorMsg: 'error getting messages'});
				// await session.abortTransaction();
				return;
			}

			// } catch (e) {
			// 	console.log('error', e);
			// 	return;
			// }

	// 	}, transactionOptions);

	// 	console.log('transactionResults', transactionResults)

	// 	if (!transactionResults) {
	// 		errorResponse(res, {}, abortError || {errorMsg: 'transaction aborted getting messages'});
	// 		return;
	// 	}
	// } catch (e) {
	// 	errorResponse(res, {}, {errorMsg: 'unexpected error getting messages', errorObject: e});
	// 	return;
	// } finally {
	// 	await session.endSession();
	// }

	// let loadedTime = null;
	// if (messages && messages.length) {
	// 	const messageIds = messages.map((message) => message.id);
	// 	filter.id = { $in: messageIds };

	// 	loadedTime = (new Date()).getTime();
	// 	const newValues = {
	// 		loadedAt: loadedTime,
    //     };
	// 	// const messageUpdateResult = db.collection('messages').updateMany(filter, { $set: newValues });
	// }

    // messages.sort((a,b) => a.createdAt - b.createdAt ); // sort by reversed created time

	// messages = messages.filter((messages) => {
	// 	return !messages.disabled;
	// });

	if (messages) {
		const result = {messages};
		if (viewedAtTime) {
			result.viewedAt = viewedAtTime;
		}
		// if (loadedTime) {
		// 	result.loadedAt = loadedTime;
		// }
		response(res, result);
	} else {
		response(res, {error: true});
	}
}