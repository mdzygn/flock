import { init, validateCredentials, response } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;

	if (!await validateCredentials(db, options)) {
		response(res, {invalid: true});
		return;
	}

    console.log('options', options);

	const details = options.details;

	if (details && details.id) {
		details.createdAt = (new Date()).getTime();
		details.modifiedAt = details.createdAt;
		details.lastActiveAt = details.createdAt;

		const result = await db.collection('projects').insertOne(details);

		if (result) {
			response(res, {success: true});
		} else {
			response(res, {error: true});
		}
	} else {
		response(res, {error: true});
	}
}