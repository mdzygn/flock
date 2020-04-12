import { init, response, errorResponse, validateCredentials } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;

	if (!await validateCredentials(db, options)) {
		errorResponse(res, {invalid: true}, {errorMsg: 'invalid credentials'});
		return;
	}

	if (options.userId && options.postId) {
		let postUpdateResult = await db.collection('posts').updateOne({ id: options.postId }, { $inc: { likeCount: -1 } });

		if (postUpdateResult) {
			const details = {};
			details.userId = options.userId;
			details.postId = options.postId;

			const likeUpdateResult = await db.collection('postLikes').deleteMany(details);
			if (likeUpdateResult) {
				let userUpdateResult = await db.collection('users').updateOne({ id: options.userId }, { $inc: { likesCount: -1 } });
				if (userUpdateResult) {
					response(res, {success: true});
				} else {
					errorResponse(res, {}, {errorMsg: 'can\'t update user likes count'});
				}
			} else {
				errorResponse(res, {}, {errorMsg: 'can\'t update likes'});
			}
		} else {
			errorResponse(res, {}, {errorMsg: 'can\'t post like count'});
		}
	} else {
		errorResponse(res, {}, {errorMsg: 'userId or postId not defined'});
	}
}