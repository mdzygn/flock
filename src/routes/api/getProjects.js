import { init, ObjectID } from '../../api/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();
	const projects = await db.collection('projects').find({}).toArray();

	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(JSON.stringify(projects));
}