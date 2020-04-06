import api from '../api';

import { writable, get } from 'svelte/store';

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

export function onPostsUpdated(handler) {
	if (!postsUpdatedHandlers.includes(handler)) {
		postsUpdatedHandlers.push(handler);
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
	if (!get(loadingPosts)) {
		loadingPosts.set(true);
		api.getPosts(options).then(result => {
			mergePosts(result);
			loadingPosts.set(false);
		});
	}
}

function mergePosts(newPosts) {
	if (newPosts && newPosts.length) {
		const curPosts = get(posts);

		curPosts.length = 0; // TODO: temp clear posts

		let curPost, newPostData, postId, newPost;
		for (var postI = 0; postI < newPosts.length; postI++) {
			newPostData = newPosts[postI];
			// postId = newPostData.id;
			// curPost = curPosts.find(match => get(match).id === postId);
			// if (!curPost) {
				curPost = PostModel(newPostData);
				curPosts.push(curPost);
				// curPosts.unshift(curPost);
				// console.log('add post: ', curPost, newPostData);
			// } else {
			// 	// console.log('update existing post: ', curPost, newPostData);
			// 	newPost = get(curPost);
			// 	newPost = Object.assign(newPost, newPostData);
			// 	curPost.set(newPost);
			// }
		}
		// console.log('update posts: ', curPosts);

		posts.set(curPosts);
	}
}

export function getPosts(options) {
	curPostFilterOptions = options;

	// if (curPostFilterOptions && options && (curPostFilterOptions.channelId !== options.channelId || curPostFilterOptions.type !== options.type)) {
		clearFilteredPosts();
	// }
	filterCurrentPosts();

	loadPosts(curPostFilterOptions);

	// console.log(get(filteredPosts));

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
	const type = curPostFilterOptions && curPostFilterOptions.type;

	if (channelId || type) {
		const newFilteredPosts = get(posts).filter(postModel => {
			const post = get(postModel);
			return (!channelId || post.channelId === channelId) && (!type || post.type === type);
		});
		filteredPosts.set(newFilteredPosts);
	} else {
		const newFilteredPosts = get(posts);
		filteredPosts.set(newFilteredPosts);
	}
}

export function getPost(postId) {
	return get(posts).find(item => get(item).id === postId);
}