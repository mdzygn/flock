import { init, response, validateCredentials, filterItemDetails } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;

	if (!await validateCredentials(db, options)) {
		response(res, {invalid: true});
		return;
	}

	let userId = options.userId;

	const postId = options.id;

    const curPost = await db.collection('posts').findOne({ id: postId });
    if (curPost) {
		if (userId && curPost.userId && curPost.userId === userId) { // if is allowed to edit post
			if (curPost.postCount && curPost.postCount >= 1) {
				response(res, {error: true, itemHasPosts: true});
			} else {
				let details = {};

				details.deleted = true;

				//TODO: check allowed to modify post, isOwner, !archive, !deleted

				const result = await db.collection('posts').updateOne({ id: postId }, { $set: details } );
				if (result) {
					let updateParentCountResult;
					switch (curPost.type) {
						case 'thread':
							updateParentCountResult = await db.collection('channels').updateOne({ id: curPost.channelId }, {
								$inc: { postCount: -1 },
							});
							break;
						case 'threadPost':
							updateParentCountResult = await db.collection('posts').updateOne({ id: curPost.threadId }, {
								$inc: { postCount: -1 },
							});
							break;
					}

					if (updateParentCountResult) {
						const userUpdateResult = await db.collection('users').updateOne({ id: curPost.userId }, { $inc: { postsCount: -1 } });

						if (userUpdateResult) {
							const projectUpdateResult = await db.collection('projects').updateOne({ id: curPost.projectId }, {
								$inc: { postsCount: -1 }
							});

							if (projectUpdateResult) {
								// TODO: remove any relevant notifications

								response(res, {success: true});
							} else {
								errorResponse(res, {deletedPost: true});
							}
						} else {
							errorResponse(res, {deletedPost: true});
						}
					} else {
						errorResponse(res, {deletedPost: true});
					}
				} else {
					errorResponse(res, {});
				}

				// if (result) {
				// 	response(res, {success: true});
				// } else {
				// 	response(res, {error: true});
				// }
			}
		} else {
			response(res, {error: true, invalidUser: true});
		}
	} else {
		response(res, {error: true});
	}
}