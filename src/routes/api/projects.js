import { init, ObjectID } from '../../api/mongo.js';

export async function get(req, res, next) {
	const { db } = await init();
	const projects = await db.collection('projects').find({}).toArray();

	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(JSON.stringify(projects));
}

export async function post(req, res, next) {
	const { db } = await init();

	const project = req.body;
	const result = await db.collection('projects').insertOne(project);

	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(JSON.stringify(result));
}

export async function put(req, res, next) {
	const { db } = await init();

	const project = req.body;
	const projectId = project._id;

	delete project._id; // clear _id as don't want to update this property

	//TODO: check allowed to modify project

	const result = await db.collection('projects').update({ _id: ObjectID(projectId)}, { $set: project } );

	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(JSON.stringify(result));
}

export async function del(req, res, next) {
	const { db } = await init();
	const projects = await db.collection('projects').find({}).toArray();

	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(JSON.stringify(projects));
}