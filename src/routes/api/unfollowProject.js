import { init, response, validateCredentials } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;

	if (!await validateCredentials(db, options)) {
		response(res, {invalid: true});
		return;
	}

	if (options.userId && options.projectId) {
		let projectUpdateResult = await db.collection('projects').updateOne({ id: options.projectId }, { $inc: { followCount: -1 } });

		if (projectUpdateResult) {
			const details = {};
			details.userId = options.userId;
			details.projectId = options.projectId;

			const result = await db.collection('follows').deleteMany(details);

			let userUpdateResult = await db.collection('users').updateOne({ id: options.userId }, { $inc: { followsCount: -1 } });
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