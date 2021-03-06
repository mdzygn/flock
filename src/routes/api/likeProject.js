import { init, response, errorResponse, validateCredentials } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;

	if (!await validateCredentials(db, options)) {
		errorResponse(res, {invalid: true}, {errorMsg: 'invalid credentials'});
		return;
	}

	if (options.userId && options.projectId) {
		const projectUpdateResult = await db.collection('projects').updateOne({ id: options.projectId }, { $inc: { likeCount: 1 } });
		if (projectUpdateResult) {
			const details = {};
			details.userId = options.userId;
			details.projectId = options.projectId;
			details.createdAt = (new Date()).getTime();

			const likeUpdateResult = await db.collection('likes').insertOne(details);
			if (likeUpdateResult) {
				const userUpdateResult = await db.collection('users').updateOne({ id: options.userId }, { $inc: { likesCount: 1 } });
				if (userUpdateResult) {
					response(res, {success: true});
				} else {
					errorResponse(res, {}, {errorMsg: 'can\'t update user likes count'});
				}
			} else {
				errorResponse(res, {}, {errorMsg: 'can\'t update likes'});
			}
		} else {
			errorResponse(res, {}, {errorMsg: 'can\'t project like count'});
		}
	} else {
		errorResponse(res, {}, {errorMsg: 'userId or projectId not defined'});
	}
}