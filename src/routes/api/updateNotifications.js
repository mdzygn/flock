import { init, response, errorResponse, validateCredentials } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;

	if (!await validateCredentials(db, options)) {
		errorResponse(res, {invalid: true}, {errorMsg: 'invalid credentials'});
		return;
	}

	const userId = options && options.userId;
    const ids = options && options.ids;

	if (userId && ids) {
		const viewedAtTime = (new Date()).getTime();

        const notificationsFilter = {
            viewed: { $ne: true },
            userId,
            id: { $in: ids },
		};
		const newValues = {
			viewed: true,
			viewedAt: viewedAtTime,
		};

		const notificationUpdateResult = await db.collection('notifications').updateMany(notificationsFilter, { $set: newValues });
		if (notificationUpdateResult) {
			response(res, {success: true});
		} else {
			errorResponse(res, {}, {errorMsg: 'can\'t update notification(s)', errorObject: notificationUpdateResult});
		}
	} else {
		errorResponse(res, {}, {errorMsg: 'userId or notification ids not defined'});
	}
}