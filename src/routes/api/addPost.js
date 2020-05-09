import config from '../../server/config';

import { init, validateCredentials, response, errorResponse, filterItemDetails, catchMongoError } from '../../server/mongo';
import createNotification from '../../server/createNotification';

import NotificationTypes from '../../config/NotificationTypes';

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
			image: true,
		};

		details = filterItemDetails(details, postDetails);

		details.createdAt = (new Date()).getTime();
		details.modifiedAt = details.createdAt;
		details.lastActiveAt = details.createdAt;

		let result;

		try {
			result = await db.collection('posts').insertOne(details);
		} catch (error) {
			catchMongoError(res, error);
			return;
		}
		const addedPost = !!result;

		if (result) {
			let updateParentCountResult;
			switch (details.type) {
				case 'thread':
					updateParentCountResult = await db.collection('channels').updateOne({ id: details.channelId }, {
						$set: { lastActiveAt: details.lastActiveAt },
						$inc: { postCount: 1 },
					});
					break;
				case 'threadPost':
					updateParentCountResult = await db.collection('posts').updateOne({ id: details.threadId }, {
						$set: { lastActiveAt: details.lastActiveAt },
						$inc: { postCount: 1 },
					});
					break;
			}

			if (updateParentCountResult) {
				const userUpdateResult = await db.collection('users').updateOne({ id: details.userId }, { $inc: { postsCount: 1 } });

				if (userUpdateResult) {
					const projectUpdateResult = await db.collection('projects').updateOne({ id: details.projectId }, { $set: { lastActiveAt: details.lastActiveAt } });

					if (projectUpdateResult) {
						const postDetails = {
							id: true,

							userId: true,
							channelId: true,
							projectId: true,
							threadId: true,

							type: true,

							title: true,
							message: true,
							image: true,
						};

						const notificationResult = await createNotification(db, {
							type: NotificationTypes.POST_ADDED,
							actors: [{id: details.userId}],

							projectId: details.projectId,

							postId: details.id,
							threadId: details.threadId,
							channelId: details.channelId,
						}, {
							postTitle: details.title,
						}, res, {addedPost: true});
						if (notificationResult === -1) {
							return;
						}

						if (config.DEBUG) {
							if (notificationResult) {
								response(res, {success: true});
							} else {
								errorResponse(res, {addedPost: true}, {errorMsg: 'error creating addPost notification', result: notificationResult});
							}
						} else {
							errorResponse(res, {addedPost: true});
						}
					} else {
						errorResponse(res, {addedPost: true});
					}
				} else {
					errorResponse(res, {addedPost: true});
				}
			} else {
				errorResponse(res, {addedPost: true});
			}
		} else {
			errorResponse(res, {});
		}
	} else {
		errorResponse(res, {});
	}
}