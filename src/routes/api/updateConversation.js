import { init, response, errorResponse, validateCredentials } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;

	if (!await validateCredentials(db, options)) {
		errorResponse(res, {invalid: true}, {errorMsg: 'invalid credentials'});
		return;
	}

	const userId = options && options.userId;
    const conversationId = options && options.id;

	if (userId && conversationId) {
		const viewedAtTime = (new Date()).getTime();

        const conversationsFilter = {
            id: conversationId,
            "users.id": userId,
		};
		const newValues = {
			"users.$.viewedAt" : viewedAtTime,
		};

		const conversationUpdateResult = await db.collection('conversations').updateMany(conversationsFilter, { $set: newValues });
		if (conversationUpdateResult) {
			response(res, {success: true});
		} else {
			errorResponse(res, {}, {errorMsg: 'can\'t update conversation(s)', errorObject: conversationUpdateResult});
		}
	} else {
		errorResponse(res, {}, {errorMsg: 'userId or conversation id not defined'});
	}
}