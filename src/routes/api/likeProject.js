import { init, response } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;

	if (options.userId && options.projectId) {
		let projectUpdateResult = await db.collection('projects').updateOne({ id: options.projectId }, { $inc: { likeCount: 1 } });

		if (projectUpdateResult) {
			const details = {};
			details.userId = options.userId;
			details.projectId = options.projectId;
			details.createdAt = (new Date()).getTime();

			const result = await db.collection('likes').insertOne(details);

			response(res, result);
		} else {
			response(res, {error: true});
		}
	} else {
		response(res, {error: true});
	}
}