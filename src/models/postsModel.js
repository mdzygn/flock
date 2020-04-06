import api from '../api';

import { writable, get } from 'svelte/store';

import PostModel from '../models/postModel';

export let loadingPosts = writable(false);

let postsUpdatedHandlers = [];
let tempPostsUpdatedHandlers = [];

let posts = writable([]);

let filteredPosts = writable([]);

// onPostsUpdated(postsUpdated);

import postsData from '../data/posts.json';
const postItems = JSON.parse(JSON.stringify(postsData));
mergePosts(postItems);

function mergePosts(newPosts) {
	if (newPosts && newPosts.length) {
		const curPosts = get(posts);

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
	const channelId = options && options.channelId;
	const type = options && options.type;

	if (channelId || type) {
		const newFilteredPosts = get(posts).filter(postModel => {
			const post = get(postModel);
			return (!channelId || post.channelId === channelId) && (!type || post.type === type);
		});
		filteredPosts.set(newFilteredPosts);
		return filteredPosts;
	} else {
		return posts;
	}
}

export function getPost(postId) {
	return get(posts).find(item => get(item).id === postId);
}