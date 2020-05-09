import {
	init,
	response,
	errorResponse,
	validateCredentials,
} from '../../server/mongo.js';

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

    let notifications = await db.collection('notifications').find(filter).toArray();

	// notifications = notifications.filter((notification) => {
	// 	return !notification.disabled;
	// });

	if (notifications) {
		response(res, notifications);
	} else {
		response(res, {error: true});
	}
}