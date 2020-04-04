import { init, ObjectID } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;

	const details = {};
	details.userId = options.userId;
	details.projectId = options.projectId;
	details.createdAt = (new Date()).getTime();

	const result = await db.collection('likes').insertOne(details);

	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(JSON.stringify(result));
}