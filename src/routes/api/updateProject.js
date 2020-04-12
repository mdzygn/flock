import { init, response, validateCredentials, filterItemDetails } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;

	if (!await validateCredentials(db, options)) {
		response(res, {invalid: true});
		return;
	}

	let details = options.details;
	let userId = options.userId;

	const projectId = options.id;

    const curProject = await db.collection('projects').findOne({ id: projectId });
    if (curProject) {
		if (userId && curProject.team && curProject.team.includes(userId)) { // is allowed to edit project
			const isModification = options.isModification;

			const setProjectDetailsSchema = {
				slug: true,
				title: true,
				description: true,
				details: true,

				headerImage: true,

				public: true,
				archived: true,

				createdAt: true,
				lastActiveAt: true,
				modifiedAt: true,

				likeCount: true,
				followCount: true,

				isNew: true,

				location: true,
				tags: true,
				skills: true,
				links: true,
				team: true,
				posts: true,
				ownerId: true,
			};

			details = filterItemDetails(details, setProjectDetailsSchema);

			details.lastActiveAt = (new Date()).getTime();
			if (isModification) {
				details.modifiedAt = details.lastActiveAt;
			}

			//TODO: check allowed to modify project, isOwner, !archive, !deleted

			const result = await db.collection('projects').updateOne({ id: projectId }, { $set: details } );

			if (result) {
				response(res, {success: true});
			} else {
				response(res, {error: true});
			}
		} else {
			response(res, {error: true, invalidUser: true});
		}
	} else {
		response(res, {error: true});
	}
}