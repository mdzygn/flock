import { init } from '../../api/mongo.js';

export async function get(req, res, next) {
	const { db } = await init();
	const projects = await db.collection('projects').find({}).toArray();

	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(JSON.stringify(projects));
}

export async function post(req, res, next) {
	const { db } = await init();

	const project = req.body;
	const result = await db.collection('projects').insert(project);

	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(JSON.stringify(result));
}

export async function put(req, res, next) {
	const { db } = await init();
	const projects = await db.collection('projects').find({}).toArray();

	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(JSON.stringify(projects));
}

export async function del(req, res, next) {
	const { db } = await init();
	const projects = await db.collection('projects').find({}).toArray();

	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(JSON.stringify(projects));
}