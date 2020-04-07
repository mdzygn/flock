import { init, response, validateCredentials, filterItemDetails } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;

	if (!await validateCredentials(db, options)) {
		response(res, {invalid: true});
		return;
	}

	let details = options.details;

	const projectId = options.id;
	const isSuperficial = options.isSuperficial;
	const isModification = options.isModification;

	const projectDetails = {
		slug: true,
		title: true,
		description: true,
		details: true,

		headerImage: true,

		public: true,

		createdAt: true,
		lastActiveAt: true,
		modifiedAt: true,

		likeCount: true,
		followCount: true,
		unreadCount: true,

		unreadMessageCount: true,
		messageCount: true,
		location: true,
		tags: true,
		skills: true,
		links: true,
		team: true,
		posts: true,
		ownerId: true,
	};

	details = filterItemDetails(details, projectDetails);

	if (!isSuperficial) {
		details.lastActiveAt = (new Date()).getTime();
		if (isModification) {
			details.modifiedAt = details.lastActiveAt;
		}
	}

	//TODO: check allowed to modify project, isOwner, !archive, !deleted

	const result = await db.collection('projects').updateOne({ id: projectId }, { $set: details } );

	if (result) {
		response(res, {success: true});
	} else {
		response(res, {error: true});
	}
}