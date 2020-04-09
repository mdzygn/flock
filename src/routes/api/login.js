import { init, response } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;
	const username = options.username;
	const pass = options.pass; // TODO check pass

	const user = await db.collection('users').findOne({ username: username });

	if (user) {
		const targetPass = user.pass ? user.pass : user.usercode;
		if (pass === targetPass) {
			response(res, user);
		} else {
			response(res, {invalid: true});
		}
	} else {
		response(res, {invalid: true});
	}
}