import { init, response, errorResponse, validateCredentials } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;

	if (!await validateCredentials(db, options)) {
		errorResponse(res, {invalid: true}, {errorMsg: 'invalid credentials'});
		return;
	}

	const unfollow = options.unfollow;
	console.log('followPost');

	if (options.userId && options.postId) {
		const details = {};
		details.userId = options.userId;
		details.postId = options.postId;

		let followUpdateResult;
		if (unfollow) {
			followUpdateResult = await db.collection('postFollows').deleteMany(details);
		} else {
			console.log('add post follow');
			details.createdAt = (new Date()).getTime();
			followUpdateResult = await db.collection('postFollows').insertOne(details);
		}

		if (followUpdateResult) {
			const postUpdateResult = await db.collection('posts').updateOne({ id: options.postId }, { $inc: { followCount: unfollow ? -1 : 1 } });
			if (postUpdateResult) {
				response(res, {success: true});
			} else {
				errorResponse(res, {}, {errorMsg: 'can\'t post follow count'});
			}
		} else {
			errorResponse(res, {}, {errorMsg: 'can\'t update post follows'});
		}
	} else {
		errorResponse(res, {}, {errorMsg: 'userId or postId not defined'});
	}
}