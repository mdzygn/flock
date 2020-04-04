import { init, ObjectID } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;
	const details = options.details;

	details.createdAt = (new Date()).getTime();
	details.modifiedAt = details.createdAt;
	details.lastActiveAt = details.createdAt;

	const result = await db.collection('projects').insertOne(details);

	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(JSON.stringify(result));
}