import { init, validateCredentials, response, filterItemDetails } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;

	if (!await validateCredentials(db, options)) {
		response(res, {invalid: true});
		return;
	}

	let details = options.details;

	if (details && (details.id || details.message)) {

		const postDetails = {
			id: true,

			userId: true,
			channelId: true,
			projectId: true,
			threadId: true,

			type: true,

			title: true,
			message: true,
		};

		details = filterItemDetails(details, postDetails);

		details.createdAt = (new Date()).getTime();
		details.modifiedAt = details.createdAt;
		details.lastActiveAt = details.createdAt;

		const result = await db.collection('posts').insertOne(details);

		if (result) {
			let updateParentCountResult;
			switch (details.type) {
				case 'thread':
					updateParentCountResult = await db.collection('channels').updateOne({ id: details.channelId }, { $inc: { postCount: 1 } });
					break;
				case 'threadPost':
					updateParentCountResult = await db.collection('posts').updateOne({ id: details.threadId }, { $inc: { postCount: 1 } });
					break;
			}

			if (updateParentCountResult) {
				const channelUpdateResult = await db.collection('users').updateOne({ id: details.userId }, { $inc: { postsCount: 1 } });

				if (channelUpdateResult) {
					response(res, {success: true});
				} else {
					response(res, {error: true});
				}
			} else {
				response(res, {error: true});
			}
		} else {
			response(res, {error: true});
		}
	} else {
		response(res, {error: true});
	}
}