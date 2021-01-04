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
		if (userId && curPost.userId && curPost.userId === userId) { // is allowed to edit post
			let details = {};

			details.deleted = true;

			//TODO: check allowed to modify post, isOwner, !archive, !deleted

			const result = await db.collection('posts').updateOne({ id: postId }, { $set: details } );

			// if (result) {
			// 	let updateParentCountResult;
			// 	switch (details.type) {
			// 		case 'thread':
			// 			updateParentCountResult = await db.collection('channels').updateOne({ id: details.channelId }, {
			// 				$set: { lastActiveAt: details.lastActiveAt },
			// 				$inc: { postCount: 1 },
			// 			});
			// 			break;
			// 		case 'threadPost':
			// 			updateParentCountResult = await db.collection('posts').updateOne({ id: details.threadId }, {
			// 				$set: { lastActiveAt: details.lastActiveAt },
			// 				$inc: { postCount: 1 },
			// 			});
			// 			break;
			// 	}

			// 	if (updateParentCountResult) {
			// 		const userUpdateResult = await db.collection('users').updateOne({ id: details.userId }, { $inc: { postsCount: 1 } });

			// 		if (userUpdateResult) {
			// 			const projectUpdateResult = await db.collection('projects').updateOne({ id: details.projectId }, { $set: { lastActiveAt: details.lastActiveAt }, $inc: { postsCount: 1 } });

			// 			if (projectUpdateResult) {
			// 				const postDetails = {
			// 					id: true,

			// 					userId: true,
			// 					channelId: true,
			// 					projectId: true,
			// 					threadId: true,

			// 					type: true,

			// 					title: true,
			// 					message: true,
			// 					image: true,
			// 				};

			// 				const notificationResult = await createNotification(db, {
			// 					type: NotificationTypes.POST_ADDED,
			// 					actors: [{id: details.userId}],

			// 					projectId: details.projectId,

			// 					postId: details.id,
			// 					threadId: details.threadId,
			// 					channelId: details.channelId,
			// 				}, {
			// 					postTitle: details.title,
			// 				}, res, {addedPost: true});
			// 				if (notificationResult === -1) {
			// 					return;
			// 				}

			// 				if (config.DEBUG) {
			// 					if (notificationResult) {
			// 						response(res, {success: true});
			// 					} else {
			// 						errorResponse(res, {addedPost: true}, {errorMsg: 'error creating addPost notification', result: notificationResult});
			// 					}
			// 				} else {
			// 					errorResponse(res, {addedPost: true});
			// 				}
			// 			} else {
			// 				errorResponse(res, {addedPost: true});
			// 			}
			// 		} else {
			// 			errorResponse(res, {addedPost: true});
			// 		}
			// 	} else {
			// 		errorResponse(res, {addedPost: true});
			// 	}
			// } else {
			// 	errorResponse(res, {});
			// }

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