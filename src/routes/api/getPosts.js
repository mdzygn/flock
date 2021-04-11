import {
	init,
	response,
	errorResponse,
	filterItemsByProjectAccess,
	validateCredentials,
	loadUserItemProperties,
} from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;
	const validLogin = await validateCredentials(db, options);

	const userId = options && options.userId;

	const type = options && options.type;

	const id = options && options.id;
	const channelId = options && options.channelId;
	const threadId = options && options.threadId;
	const projectId = options && options.projectId;
	const getFollowState = options && options.getFollowState;

	const filter = {};
	if (type) {
		if (type.includes(',')) {
			// filter.type = type.split(',')[1];
			filter.type = { $in: type.split(',') };
		} else {
			filter.type = type;
		}
		// console.log('filter.type', filter.type, 'type', type, type.includes(','), type.split(','));
	}
	if (id) {
		filter.id = id;
	}
	if (threadId) {
		filter.threadId = threadId;
	}
	if (channelId) {
		filter.channelId = channelId;
	}
	if (projectId) {
		filter.projectId = projectId;
	}
	filter.deleted =  { $ne: true };

	if (!(id || threadId || channelId || projectId)) {
		errorResponse(res, {}, {errorMsg: 'post id, threadId, channelId ot projectId not set'});
		return;
	}
	if ((threadId || channelId || projectId) && !type) {
		errorResponse(res, {}, {errorMsg: 'type not set'});
		return;
	}

	let posts = await db.collection('posts').find(filter).toArray();

	posts = await filterItemsByProjectAccess(posts, userId, validLogin);

	posts = posts.filter((post) => {
		return !post.disabled;
	});

	if (posts.length && userId) {
		const postSettings = {
			userId,
			itemIdProp: 'postId',
			collections: {
				likes: 'postLikes',
			},
		}
		if (getFollowState) {
			postSettings.collections.follows ='postFollows';
		}
		await loadUserItemProperties(posts, postSettings);
	}

	// const posts = []; // to test returning no posts

	if (posts) {
		response(res, posts);
	} else {
		response(res, {error: true});
	}
}