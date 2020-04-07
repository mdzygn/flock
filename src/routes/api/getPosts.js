import { init, response } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;

	const type = options && options.type;

	const channelId = options && options.channelId;
	const threadId = options && options.threadId;

	const filter = {};
	if (type) {
		filter.type = type;
	}
	if (threadId) {
		filter.threadId = threadId;
	} else if (channelId) {
		filter.channelId = channelId;
	}

	const posts = await db.collection('posts').find(filter).toArray();

	// const posts = []; // to test returning no posts

	if (posts) {
		response(res, posts);
	} else {
		response(res, {error: true});
	}
}