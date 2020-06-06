import { init, response, validateCredentials, getItemIds, loadUserItemProperties } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;

	const validLogin = await validateCredentials(db, options);

	const userId = (options && options.userId) || null;
	const projectId = options && options.id;

	const projectsFilter = {};
	if (projectId) {
		projectsFilter.id = projectId;
	}

	let projects = await db.collection('projects').find(projectsFilter).toArray();

	projects = projects.filter((project) => {
		return (project.public && !project.archived && !project.disabled) || (userId && validLogin && project.team && project.team.includes(userId));
	});

	if (projects.length && userId) {
		projects.forEach((project) => {
			if (project.skills && project.skills instanceof Array) { // TODO: remove convertion once all converted
				project.skills = project.skills.join(', ');
			}
		});

		await loadUserItemProperties(projects, {
			userId,
			itemIdProp: 'projectId',
			collections: {
				follows: 'follows',
				likes: 'likes',
			},
		});
	}

	if (projects) {
		response(res, projects);
	} else {
		response(res, {error: true});
	}
}