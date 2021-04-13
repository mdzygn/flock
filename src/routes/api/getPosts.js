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

	const hasProjectPostAndChannelSet = type.includes('projectPost') && channelId;

	let filter = {};

	console.log('hasProjectPostAndChannelSet', hasProjectPostAndChannelSet, type, channelId);

	if (!hasProjectPostAndChannelSet) {
		if (type) {
			filter.type = type.includes(',') ? { $in: type.split(',') } : type;
			// console.log('filter.type', filter.type, 'type', type, type.includes(','), type.split(','));
		}
		if (channelId) {
			filter.channelId = channelId;
		}
	}
	if (id) {
		filter.id = id;
	}
	if (threadId) {
		filter.threadId = threadId;
	}
	if (projectId) {
		filter.projectId = projectId;
	}
	filter.deleted = { $ne: true };

	if (hasProjectPostAndChannelSet) {
		const filterA = JSON.parse(JSON.stringify(filter));
		filterA.type = 'projectPost';

		const filterB = JSON.parse(JSON.stringify(filter));
		filterB.type = type.includes(',') ? { $in: type.split(',').filter(item => item !== 'projectPost') } : type;
		filterB.channelId = channelId;

		filter = {$or: [filterA, filterB]};

		// console.log(JSON.stringify(filter, null, 2));
	}

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