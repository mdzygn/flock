import { init, response } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;

	let followedProjectIds = null;
	let likedProjectIds = null;

	if (options && options.userId) {
		followedProjectIds = {};
		likedProjectIds = {};

		const follows = await db.collection('follows').find({userId: options.userId}).toArray();
		for (var followI = 0; followI < follows.length; followI++) {
			followedProjectIds[follows[followI].projectId] = follows[followI];
		}

		const likes = await db.collection('likes').find({userId: options.userId}).toArray();
		for (var likeI = 0; likeI < likes.length; likeI++) {
			likedProjectIds[likes[likeI].projectId] = true;
		}

		// console.log('followedProjectIds', followedProjectIds);
	}

	const projects = await db.collection('projects').find({}).toArray();

	// const projects = []; // to test returning no projects

	if (followedProjectIds && projects) {
		let project, followItem;
		for (var projectI = 0; projectI < projects.length; projectI++) {
			project = projects[projectI];
			project.liked = !!likedProjectIds[project.id];

			followItem = followedProjectIds[project.id];
			project.following = !!followItem;
			if (project.following) {
				project.followTime = followItem.createdAt;
			}
		}
	}

	if (projects) {
		response(res, projects);
	} else {
		response(res, {error: true});
	}
}