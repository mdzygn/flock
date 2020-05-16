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
		response(res, {conversations: []});
		return
	}

	if (!await validateCredentials(db, options)) {
		errorResponse(res, {invalid: true}, {errorMsg: 'invalid credentials'});
		return;
    }

	const userId = options && options.userId;
	const conversationId = options && options.id;
	const getUnviewed = options && options.getUnviewed;
	let loadedAt = options && options.loadedAt;

	if (!userId) {
		errorResponse(res, {}, {errorMsg: 'userId not set'});
		return;
    }

	const filter = {};
	filter.userIds = userId; // userId contained in userIds

	if (conversationId) {
		filter.id = conversationId;
	}
	if (loadedAt) {
		filter.lastMessageAt = {$gt: loadedAt};
		// filter.loadedAt = {"$exists": false};
		// filter.loadedAt = { "$or" : [  {"$exists": false}, {$gt: loadedAt} ] };
	}

	// if (getUnviewed) {
	// 	filter.viewed = {$ne: true};
	// }
	// if (loadedAt) {
	// 	filter.loadedAt = {"$exists": false};
	// 	// filter.loadedAt = { "$or" : [  {"$exists": false}, {$gt: loadedAt} ] };
	// }

	const sort = {
		lastMessageAt: 1
		// createdAt: 1
	};

	let conversations = await db.collection('conversations').find(filter).sort(sort).toArray();

	let loadedTime;

	if (conversations && conversations.length) {
		const conversationIds = conversations.map((conversation) => conversation.id);

		filter.id = { $in: conversationIds };
		filter["users.id"] = userId,

		loadedTime = (new Date()).getTime();
		const newValues = {
			"users.$.loadedAt" : loadedTime,
		};

		// update loaded at time only for current user
		const conversationUpdateResult = db.collection('conversations').updateMany(filter, { $set: newValues });
	}

    // conversations.sort((a,b) => a.createdAt - b.createdAt ); // sort by reversed created time

	let curUser;
	conversations.forEach((conversation) => {
		curUser = conversation.users.find((user) => user.id === userId);
		conversation.viewed = curUser ? curUser.viewedAt >= conversation.lastMessageAt : true;
		// console.log(conversation.lastMessageText + ', ' + curUser.id + ', ' + conversation.viewed + ', ' + curUser.viewedAt + ' < ' + conversation.lastMessageAt);
	});
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