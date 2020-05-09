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

	if (!userId) {
		errorResponse(res, {}, {errorMsg: 'userId not set'});
		return;
    }

	const filter = {};
	filter.userId = userId;
	// if (!DEBUG) {
	// 	filter.notPriority = {$ne: true}; // need to return so can show notification areas
	// }

    let notifications = await db.collection('notifications').find(filter).toArray();

    // notifications.sort((a,b) => a.createdAt - b.createdAt ); // sort by reversed created time

	// notifications = notifications.filter((notification) => {
	// 	return !notification.disabled;
	// });

	if (notifications) {
		response(res, notifications);
	} else {
		response(res, {error: true});
	}
}