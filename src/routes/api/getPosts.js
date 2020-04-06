import { init, response } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;


	const channelId = options && options.channelId;
	const type = options && options.type;

	const filter = {};
	if (channelId) {
		filter.channelId = channelId;
	}
	if (type) {
		filter.type = type;
	}

	const posts = await db.collection('posts').find(filter).toArray();

	// const posts = []; // to test returning no posts

	if (posts) {
		response(res, posts);
	} else {
		response(res, {error: true});
	}
}