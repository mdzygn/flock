import { init, response } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;

	if (options.userId && options.projectId) {
		const projectUpdateResult = await db.collection('projects').updateOne({ id: options.projectId }, { $inc: { followCount: 1 } });

		if (projectUpdateResult) {
			const details = {};
			details.userId = options.userId;
			details.projectId = options.projectId;
			details.createdAt = (new Date()).getTime();

			const result = await db.collection('follows').insertOne(details);

			const userUpdateResult = await db.collection('users').updateOne({ id: options.userId }, { $inc: { followsCount: 1 } });
			if (userUpdateResult) {
				response(res, {success: true});
			} else {
				response(res, {error: true});
			}
		} else {
			response(res, {error: true});
		}
	} else {
		response(res, {error: true});
	}
}