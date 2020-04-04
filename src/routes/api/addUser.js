import { init } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;
	const details = options.details;

	if (!details.username || !details.usercode) {
		res.end(JSON.stringify({error: true}));
		return;
	}

	let exisitingUser = await db.collection('users').findOne({ username: details.username });
	if (exisitingUser) {
		res.end(JSON.stringify({invalid: true, errorType: 'username_exists'}));
		return;
	}

	details.createdAt = (new Date()).getTime();
	details.modifiedAt = details.createdAt;
	details.lastActiveAt = details.createdAt;

	const result = await db.collection('users').insertOne(details);

	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(JSON.stringify(result));
}