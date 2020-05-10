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
	filter.userId = userId;

	if (getUnviewed) {
		filter.viewed = {$ne: true};
	}
	if (loadedAt) {
		filter.loadedAt = {"$exists": false};
		// filter.loadedAt = { "$or" : [  {"$exists": false}, {$gt: loadedAt} ] };
	}

	// filter.indirect = {$ne: true}; // need to return so can show notification areas

	let notifications = await db.collection('notifications').find(filter).sort({ createdAt: 1 }).toArray();

	if (notifications && notifications.length) {
		const notificationIds = notifications.map((notification) => notification.id);
		filter.id = { $in: notificationIds };

		loadedAt = (new Date()).getTime();
		const newValues = {
			loadedAt,
		};
		const notificationUpdateResult = db.collection('notifications').updateMany(filter, { $set: newValues });
	}

    // notifications.sort((a,b) => a.createdAt - b.createdAt ); // sort by reversed created time

	// notifications = notifications.filter((notification) => {
	// 	return !notification.disabled;
	// });

	if (notifications) {
		response(res, {notifications, loadedAt});
	} else {
		response(res, {error: true});
	}
}