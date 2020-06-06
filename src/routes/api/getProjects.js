import { init, response, validateCredentials, getProjectLikeFollowCounts, loadUserItemProperties } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;

	const validLogin = await validateCredentials(db, options);

	const userId = (options && options.userId) || null;
	const projectId = options && options.id;
	const getCounts = options && options.getCounts; // TODO: to remove

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
			project.prevLikeCount = project.likeCount;
			project.prevFollowCount = project.followCount;

			project.likeCount = 0;
			project.followCount = 0;
		});

		if (getCounts) {
			await getProjectLikeFollowCounts(projects);
		} else if (projectId) {
			const existingProject = projects.find(project => project.id === projectId);
			if (existingProject && existingProject.team && existingProject.team.includes(userId)) {
				await getProjectLikeFollowCounts([existingProject]);
			}
		}

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