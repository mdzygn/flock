import { DEBUG } from '../../server/config';

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
		response(res, {messages: []});
		return
	}

	if (!await validateCredentials(db, options)) {
		errorResponse(res, {invalid: true}, {errorMsg: 'invalid credentials'});
		return;
    }

	const conversationId = options && options.conversationId;
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

	const filter = {};
    filter.conversationId = conversationId;

	const sort = {
		createdAt: 1
	};

    let messages = await db.collection('messages').find(filter).sort(sort).toArray();

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
		// if (loadedTime) {
		// 	result.loadedAt = loadedTime;
		// }
		response(res, result);
	} else {
		response(res, {error: true});
	}
}