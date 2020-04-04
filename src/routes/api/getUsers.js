import { init } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;

	const projects = await db.collection('users').find({}).toArray();

	// const projects = []; // to test returning no users

	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(JSON.stringify(projects));
}