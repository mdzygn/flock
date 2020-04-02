import { init, ObjectID } from '../../api/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;

	let followedProjectIds = null;

	if (options && options.userId) {
		followedProjectIds = {};

		const follows = await db.collection('follows').find({userId: options.userId}).toArray();
		for (var followI = 0; followI < follows.length; followI++) {
			followedProjectIds[follows[followI].projectId] = true;
		}
		// console.log('followedProjectIds', followedProjectIds);
	}

	const projects = await db.collection('projects').find({}).toArray();

	// const projects = []; // to test returning no projects

	if (followedProjectIds && projects) {
		let project;
		for (var projectI = 0; projectI < projects.length; projectI++) {
			project = projects[projectI];
			project.following = !!followedProjectIds[project.id];
			project.dynamicFollowing = project.following;
		}
	}

	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(JSON.stringify(projects));
}