import { MESSAGE_SYNC_DEBUG } from '../../server/config';

import {
	init,
	response,
	errorResponse,
	validateCredentials,
} from '../../server/mongo';

export async function post(req, res, next) {
	const { db } = await init();

    const options = req.body;

	if (!options.userId) {
		response(res, {conversations: []});
		return
	}

	if (!await validateCredentials(db, options)) {
		errorResponse(res, {invalid: true}, {errorMsg: 'invalid credentials'});
		return;
    }

	const userId = options && options.userId;
	const conversationId = options && options.id;
	const usersId = options && options.usersId;

	const getUnviewed = options && options.getUnviewed;
	let loadedAt = options && options.loadedAt;

	if (!userId) {
		errorResponse(res, {}, {errorMsg: 'userId not set'});
		return;
	}
	if (!userId && !conversationId && !usersId) {
		errorResponse(res, {}, {errorMsg: 'conversationId or usersId not set'});
		return;
    }

	const getConversationsFilter = {};
	getConversationsFilter.userIds = userId; // userId contained in userIds

	if (conversationId) {
		getConversationsFilter.id = conversationId;
	} else if (usersId) {
		getConversationsFilter.usersId = usersId;
	}
	// if (getUnviewed) {
	// 	getConversationsFilter['users.id'] = userId;
	// 	getConversationsFilter['$expr'] = {$gt: ["$lastMessageAt", "$users.$.loadedAt"]};
	// 	// getConversationsFilter['$expr'] = {$gt: ["$lastMessageAt", "$createdAt"]};
	// 	// getConversationsFilter['$where'] = 'this.lastMessageAt > this.users.$.loadedAt';
	// 	// getConversationsFilter['$where'] = 'this.users.$.loadedAt >= this.lastMessageAt';
	// 	// getConversationsFilter.viewed = {$ne: true};
	// 	// // getConversationsFilter['users.id']: details.userId,
	// 	// getConversationsFilter['users.' + userId + '.loadedAt'] : details.createdAt,
	// }
	if (loadedAt) {
		getConversationsFilter.lastMessageAt = {$gt: loadedAt};
		// getConversationsFilter.loadedAt = {"$exists": false};
		// getConversationsFilter.loadedAt = { "$or" : [  {"$exists": false}, {$gt: loadedAt} ] };
	}

	// getConversationsFilter["users.id"] = userId;

	// if (getUnviewed) {
	// 	getConversationsFilter.viewed = {$ne: true};
	// }
	// if (loadedAt) {
	// 	getConversationsFilter.loadedAt = {"$exists": false};
	// 	// getConversationsFilter.loadedAt = { "$or" : [  {"$exists": false}, {$gt: loadedAt} ] };
	// }

	const requestId = Math.floor(Math.random() * 99999);

	const sort = {
		lastMessageAt: 1
		// createdAt: 1
	};

	let conversations = await db.collection('conversations').find(getConversationsFilter).sort(sort).toArray();

	let curUser;
	conversations = conversations.filter((conversation) => {
		curUser = conversation.users.find((user) => user.id === userId);
		conversation.viewed = curUser ? (conversation.lastSenderId === userId || curUser.viewedAt >= conversation.lastMessageAt) : true;
		if (MESSAGE_SYNC_DEBUG) console.log('getConversations ' + requestId + ' ' + conversation.id + ' ' + conversation.lastMessageText + ', ' + curUser.id + ', ' + conversation.viewed + ', ' + curUser.viewedAt + ' >= ' + conversation.lastMessageAt);

		// TODO: optimize - only select unviewed in the first place if required
		return getUnviewed ? !conversation.viewed : true;
	});

	let loadedTime;

	if (conversations && conversations.length) {
		const conversationIds = conversations.map((conversation) => conversation.id);

		const updateConversationsFilter = JSON.parse(JSON.stringify(getConversationsFilter));
		// const updateConversationsFilter = getConversationsFilter;

		updateConversationsFilter.id = { $in: conversationIds };
		updateConversationsFilter["users.id"] = userId;

		loadedTime = (new Date()).getTime();
		const newValues = {
			"users.$.loadedAt" : loadedTime,
		};

		if (MESSAGE_SYNC_DEBUG) console.log('getConversations ' + requestId + ' ' + loadedTime);

		// update loaded at time only for current user
		db.collection('conversations').updateMany(updateConversationsFilter, { $set: newValues });
		// const conversationUpdateResult = db.collection('conversations').updateMany(getConversationsFilter, { $set: newValues });
	}

    // conversations.sort((a,b) => a.createdAt - b.createdAt ); // sort by reversed created time

	// let curUser;
	// conversations.forEach((conversation) => {
	// 	curUser = conversation.users.find((user) => user.id === userId);
	// 	conversation.viewed = curUser ? curUser.viewedAt >= conversation.lastMessageAt : true;
	// 	// console.log(conversation.lastMessageText + ', ' + curUser.id + ', ' + conversation.viewed + ', ' + curUser.viewedAt + ' < ' + conversation.lastMessageAt);
	// });
	// conversations = conversations.filter((conversation) => {
	// 	return !conversation.disabled;
	// });

	if (conversations) {
		const result = {conversations};
		if (loadedTime) {
			result.loadedAt = loadedTime;
		}
		response(res, result);
	} else {
		errorResponse(res, {}, {errorMsg: 'error loading conversations'});
	}
}