import { init, ObjectID } from '../../api/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;
	const details = options.details;
	const projectId = options._id;

	//TODO: check allowed to modify project

	const result = await db.collection('projects').updateOne({ _id: ObjectID(projectId)}, { $set: details } );

	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(JSON.stringify(result));
}