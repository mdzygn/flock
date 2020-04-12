import { init, response } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;

	let followedProjectIds = null;
	let likedProjectIds = null;

	const userId = (options && options.userId) || null;
	const projectId = options && options.id;

	const projectsFilter = {};
	if (projectId) {
		projectsFilter.id = projectId;
	}

	if (userId) {
		followedProjectIds = {};
		likedProjectIds = {};

		const userProjectFilter = {userId};
		if (projectId) {
			userProjectFilter.projectId = projectId;
		}

		const follows = await db.collection('follows').find(userProjectFilter).toArray(); // {userId: userId}
		for (var followI = 0; followI < follows.length; followI++) {
			followedProjectIds[follows[followI].projectId] = follows[followI];
		}

		const likes = await db.collection('likes').find(userProjectFilter).toArray();
		for (var likeI = 0; likeI < likes.length; likeI++) {
			likedProjectIds[likes[likeI].projectId] = true;
		}

		// console.log('followedProjectIds', followedProjectIds);
	}

	let projects = await db.collection('projects').find(projectsFilter).toArray();

	// const projects = []; // to test returning no projects

	projects = projects.filter((project) => {
		return (project.public && !project.archived) || (userId && project.team && project.team.includes(userId));
	});

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