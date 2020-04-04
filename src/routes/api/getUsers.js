import { init, response } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;

	const users = await db.collection('users').find({}).toArray();

	// const users = []; // to test returning no users

	if (users) {
		response(res, users);
	} else {
		response(res, {error: true});
	}
}