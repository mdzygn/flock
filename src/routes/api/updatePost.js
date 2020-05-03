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

	const postId = options.id;

    const curPost = await db.collection('posts').findOne({ id: postId });
    if (curPost) {
		if (userId && curPost.userId && curPost.userId === userId) { // is allowed to edit post
			const setPostDetailsSchema = {
                title: true,
                message: true,

				edited: true,
			};

			details = filterItemDetails(details, setPostDetailsSchema);

			details.lastActiveAt = (new Date()).getTime();
			details.editedAt = details.lastActiveAt;
			details.modifiedAt = details.lastActiveAt;

			//TODO: check allowed to modify post, isOwner, !archive, !deleted

			const result = await db.collection('posts').updateOne({ id: postId }, { $set: details } );

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