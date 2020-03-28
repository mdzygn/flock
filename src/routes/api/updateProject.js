import { init } from '../../api/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;
	const details = options.details;
	const projectId = options.id;

	//TODO: check allowed to modify project

	const result = await db.collection('projects').updateOne({ id: projectId }, { $set: details } );

	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(JSON.stringify(result));
}