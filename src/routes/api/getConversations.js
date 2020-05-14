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

	if (!await validateCredentials(db, options)) {
		errorResponse(res, {invalid: true}, {errorMsg: 'invalid credentials'});
		return;
    }

	const userId = options && options.userId;
	const getUnviewed = options && options.getUnviewed;
	let loadedAt = options && options.loadedAt;

	if (!userId) {
		errorResponse(res, {}, {errorMsg: 'userId not set'});
		return;
    }

	const filter = {};
	filter.userIds = userId; // userId contained in userIds

	// if (getUnviewed) {
	// 	filter.viewed = {$ne: true};
	// }
	// if (loadedAt) {
	// 	filter.loadedAt = {"$exists": false};
	// 	// filter.loadedAt = { "$or" : [  {"$exists": false}, {$gt: loadedAt} ] };
    // }

	let conversations = await db.collection('conversations').find(filter).sort({ createdAt: 1 }).toArray();

	let loadedTime = null;
	if (conversations && conversations.length) {
		const conversationIds = conversations.map((conversation) => conversation.id);
		filter.id = { $in: conversationIds };

		loadedTime = (new Date()).getTime();
		const newValues = {
			loadedAt: loadedTime,
        };
		// const conversationUpdateResult = db.collection('conversations').updateMany(filter, { $set: newValues });
	}

    // conversations.sort((a,b) => a.createdAt - b.createdAt ); // sort by reversed created time

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
		response(res, {error: true});
	}
}