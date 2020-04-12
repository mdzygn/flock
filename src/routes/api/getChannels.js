import { init, response } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;

	const id = options && options.id;
	const projectId = options && options.projectId;
	const userId = options && options.userId;

	const filter = {};
	filter.disabled = {$ne: true};
	if (id) {
		filter.id = id;
	}
	if (projectId) {
		filter.projectId = projectId;
	}

	if (!(id || projectId)) {
		response(res, {error: true});
		return;
	}

	let channels = await db.collection('channels').find(filter).toArray();

	const projectIds = [];
	let channel;
	for (var channelI = 0; channelI < channels.length; channelI++) {
		channel = channels[channelI];
		if (!projectIds.includes(channel.projectId)) { // !(channel.public && !channel.archived) &&
			projectIds.push(channel.projectId);
		}
	}

	let projects = null;
	if (projectIds.length) {
		const projectsFilter = { "id": { "$in": projectIds } };
		projects = await db.collection('projects').find(projectsFilter).toArray();
		// console.log('projectIds', projectIds, projectId, id, projects.length);
	}

	let curProject;
	channels = channels.filter((channel) => {
		curProject = projects.find(project => project.id === channel.projectId);
		// console.log('curProject', curProject);
		if (curProject) {
			if (curProject.public && !curProject.archived) {
				// console.log('public');
				return true;
			} else if (userId && curProject.team && curProject.team.includes(userId)) {
				// console.log('team');
				return true;
			} else {
				// console.log('not allowed');
				return false;
			}
		} else {
			return false;
		}
	});

	// const channels = []; // to test returning no channels

	if (channels) {
		response(res, channels);
	} else {
		response(res, {error: true});
	}
}