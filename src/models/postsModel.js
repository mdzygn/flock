import api from '../api';

import config from '../config';

import { writable, get } from 'svelte/store';

import { generateId, secondsDiff } from '../utils';

import loadingRequestUtil from '../utils/loadingRequestUtil';

import AppModel, {
    user,
	userId,
	project,
	savingPost,
	savingPostId,
	triggerFollowPost,
    getIsProjectTeamMember,
} from '../models/appModel';

import PostModel from '../models/postModel';

export let loadingPosts = writable(false);

let postsUpdatedHandlers = [];
// let tempPostsUpdatedHandlers = [];

let curPostFilterOptions = null;

let posts = writable([]);

let filteredPosts = writable([]);

onPostsUpdated(postsUpdated);

// import postsData from '../data/posts.json';
// const postItems = JSON.parse(JSON.stringify(postsData));
// mergePosts(postItems);

AppModel.on('createdPost', onCreatedPost);

export function onPostsUpdated(handler) {
	if (!postsUpdatedHandlers.includes(handler)) {
		postsUpdatedHandlers.push(handler);
	}
}

export function onCreatedPost(curTargetPost) {
	if (curTargetPost.type === 'threadPost' && curTargetPost.threadId) {
		const curThreadModel = getPost(curTargetPost.threadId);
		if (curThreadModel) {
			const curThread = get(curThreadModel);
			if (curThread) {
				curThread.postCount++;
				curThreadModel.set(curThread);
			}
		}
	}
}

posts.subscribe(() => {
	postsUpdatedHandlers.forEach(handler => {
		handler();
	});

	// tempProjectsUpdatedHandlers.forEach(handler => {
	// 	handler();
	// });
	// tempProjectsUpdatedHandlers.length = 0;
});

export function loadPosts(options) {
	// if (!get(loadingPosts)) {
	// 	loadingPosts.set(true);
	if (!loadingRequestUtil.isLoading('posts', options)) {
		loadingRequestUtil.setLoading('posts', options, () => { loadingPosts.set(true); });
		api.getPosts(options).then(result => {
			mergePosts(result);
			// loadingPosts.set(false);
			loadingRequestUtil.clearLoading('posts', options, () => { loadingPosts.set(false); });
		});
	}
}

function mergePosts(newPosts) {
	if (newPosts && newPosts.length) {
		const curPosts = get(posts);

		// curPosts.length = 0; // TODO: temp clear posts

		const curSavingPostId = get(savingPostId);

		let curPost, newPostData, postId, newPost;
		for (var postI = 0; postI < newPosts.length; postI++) {
			newPostData = newPosts[postI];
			postId = newPostData.id;
			if (postId !== curSavingPostId) {
				curPost = curPosts.find(match => get(match).id === postId);
				if (!curPost) {
					curPost = PostModel(newPostData);
					// curPosts.push(curPost);
					curPosts.unshift(curPost);
					// console.log('add post: ', curPost, newPostData);
				} else {
					// console.log('update existing post: ', curPost, newPostData);
					newPost = get(curPost);
					newPost = Object.assign(newPost, newPostData);
					curPost.set(newPost);
				}
			}
		}
		// console.log('update posts: ', curPosts);

		posts.set(curPosts);
	}
}

export function getPosts(options) {
	if (options.threadId || options.channelId || options.projectId) {
		if (curPostFilterOptions && options && (
			curPostFilterOptions.type !== options.type ||
			curPostFilterOptions.channelId !== options.channelId ||
			curPostFilterOptions.threadId !== options.threadId ||
			curPostFilterOptions.projectId !== options.projectId
		)) {
			clearFilteredPosts();
		}

		curPostFilterOptions = JSON.parse(JSON.stringify(options));

		filterCurrentPosts();

		loadPosts(curPostFilterOptions);

		// console.log(get(filteredPosts));
	}

	return filteredPosts;
}

function postsUpdated() {
	filterCurrentPosts();
}

function clearFilteredPosts() {
	const curFilteredPosts = get(filteredPosts);
	curFilteredPosts.length = 0;
	filteredPosts.set(curFilteredPosts);
}

function filterCurrentPosts() {
	const channelId = curPostFilterOptions && curPostFilterOptions.channelId;
	const threadId = curPostFilterOptions && curPostFilterOptions.threadId;
	const projectId = curPostFilterOptions && curPostFilterOptions.projectId;
	const type = curPostFilterOptions && curPostFilterOptions.type;
	const sortByCreated = (curPostFilterOptions && curPostFilterOptions.sortByCreated) || false;

	let newFilteredPosts = get(posts);
	if (channelId || projectId || type) {
		newFilteredPosts = newFilteredPosts.filter(postModel => {
			const post = get(postModel);
			// console.log(post.title + ', ' + post.channelId + ', ' + post.type);
			return (!type || post.type === type) && (!channelId || post.channelId === channelId) && (!projectId || post.projectId === projectId) && (!threadId || post.threadId === threadId);
		});
	}
	switch (type) {
		case 'thread':
		case 'projectPost':
			if (sortByCreated) {
				newFilteredPosts.sort((a,b) => get(b).createdAt - get(a).createdAt ); // sort by reversed created time
			} else {
				newFilteredPosts.sort((a,b) => get(b).lastActiveAt - get(a).lastActiveAt); // sort by reversed created time
			}
			break;
		case 'threadPost':
			newFilteredPosts.sort((a,b) => get(a).createdAt - get(b).createdAt ); // sort by reversed created time
			break;
	}
	filteredPosts.set(newFilteredPosts);
}

export function getPost(postId) {
	return get(posts).find(item => get(item).id === postId);
}

export function addPost(postDetails) {
    // let postId, trialIndex;
	// do { postId = generateId(); } while (getPost(postId) && trialIndex < 99);
	// if (trialIndex === 99) { return null; }

	const newPostModel = PostModel();
	const newPost = get(newPostModel);

	const ownerId = get(userId);

	// newPost.id = postId;
	newPost.id = postDetails.id;

	newPost.type = postDetails.type;

	newPost.projectId = postDetails.projectId;
	newPost.channelId = postDetails.channelId;
	newPost.threadId = postDetails.threadId;

	newPost.title = postDetails.title || '';
	newPost.message = postDetails.message || '';

	if (postDetails.image) {
		newPost.image = postDetails.image;
	}

	newPost.userId = ownerId;

	newPost.createdAt = (new Date()).getTime(); // use for initial sort values
	newPost.modifiedAt = newPost.createdAt;
	newPost.lastActiveAt = newPost.createdAt;

	// console.log('newPost', newPost);

	savingPostId.set(newPost.id); // need to keep saving post so doesn't override on load
	savingPost.set(true);

	const result = api.addPost({details: newPost});
	if (result) {
		result.then(result => {
			if (!result || result.error || result.invalid) {
				// console.error(result);
			}
			savingPost.set(false);
			return result;
			// newPost._id = result.insertedId;
		});
	}

	const curPosts = get(posts);
	curPosts.unshift(newPostModel);
	posts.set(curPosts);

	filterCurrentPosts();

	if (postDetails.threadId) {
		triggerFollowPost(postDetails.threadId);
	}

	return result; // newPostModel;
}

export function updatePost(post, postDetails) {
	const curTime = (new Date()).getTime();
	if (secondsDiff(post.createdAt, curTime) > config.SHOW_EDITED_MIN_TIME) {
		postDetails.edited = true;
	}

	savingPostId.set(post.id); // need to keep saving post so doesn't override on load
	savingPost.set(true);
	const result = api.updatePost({id: post.id, details: postDetails});
	if (result) {
		result.then(() => {
			savingPost.set(false);
			return result;
		});
	} else {
		savingPost.set(false);
	}

	Object.assign(post, postDetails);

	post.lastActiveAt = (new Date()).getTime();
	post.editedAt = post.lastActiveAt;
	post.modifiedAt = post.lastActiveAt;

	return result;
}

export function deletePost(post) {
	let postId = post.id;
	savingPostId.set(postId); // need to keep saving post so doesn't override on load
	savingPost.set(true);
	const result = api.deletePost({id: postId});
	if (result) {
		result.then((result) => {
			if (result && !result.error) {
				const curPosts = get(posts);
				let targetPost = curPosts.find(match => get(match).id === postId);
				if (targetPost) {
					let targetPostIndex = curPosts.indexOf(targetPost);
					if (targetPostIndex !== -1) {
						curPosts.splice(targetPostIndex, 1);
					}
				}
			}

			savingPost.set(false);
			
			return result;
		});
	} else {
		savingPost.set(false);
	}

	Object.assign(post, null);

	return result;
}

export function setLikePost(targetPost, like) {
	if (like) {
		api.likePost({userId: get(userId), postId: targetPost.id});
	} else {
		api.unlikePost({userId: get(userId), postId: targetPost.id});
	}

	targetPost.liked = like;
	targetPost.likeCount = (targetPost.likeCount || 0) + (like ? 1 : -1);

	const curUserDetails = get(user);
	if (curUserDetails) {
		curUserDetails.likesCount = curUserDetails.likesCount + (like ? 1 : -1);
		user.set(curUserDetails);
	}
}

export function setFollowPost(targetPost, unfollow) {
	const follow = unfollow ? false : true;

	if (targetPost.following !== follow && targetPost.userId !== get(userId) && !getIsProjectTeamMember(get(project))) {
		api.followPost({userId: get(userId), postId: targetPost.id, unfollow});

		targetPost.following = follow;
		targetPost.followCount = (targetPost.likeCount || 0) + (unfollow ? 1 : -1);
		// targetPost.followTime = (new Date()).getTime();

		return true;
	}
	return false;
}

export function getNewPostId() {
    let postId, trialIndex;
	do { postId = generateId(12); } while (getPost(postId) && trialIndex < 99);
	if (trialIndex === 99) { return null; }
	return postId;
}