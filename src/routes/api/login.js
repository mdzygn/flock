import { init } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;
	const username = options.username;
	const pass = options.pass; // TODO check pass

	const user = await db.collection('users').findOne({ username: username });

	res.writeHead(200, {'Content-Type': 'application/json'});
	if (user) {
		res.end(JSON.stringify(user));
	} else {
		res.end(JSON.stringify({error: true}));
	}
}