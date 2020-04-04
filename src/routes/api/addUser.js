import { init, response } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;
	const details = options.details;

	if (details && details.username && details.usercode) {
		let exisitingUser = await db.collection('users').findOne({ username: details.username });
		if (exisitingUser) {
			response(res, {invalid: true, errorType: 'username_exists'});
		} else {
			details.createdAt = (new Date()).getTime();
			details.modifiedAt = details.createdAt;
			details.lastActiveAt = details.createdAt;

			const result = await db.collection('users').insertOne(details);

			response(res, result);
		}
	} else {
		response(res, {error: true});
	}
}