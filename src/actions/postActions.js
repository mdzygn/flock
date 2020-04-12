import { get } from 'svelte/store';

import { copyToClipboard } from '../utils';

import {
    checkLoggedIn,
    loadChannel,
    loadPost,
} from '../actions/appActions';

import {
    post,
} from '../models/appModel';

import {
    addPost,
    setLikePost,
    getPost,
} from '../models/postsModel';

function checkUpdatePost(targetPost) {
    const curPost = get(post);
    if (curPost && curPost.id === targetPost.id) {
        post.set(targetPost);
    }
}

export function createPost(postDetails) {
    if (!checkLoggedIn()) { return; }

    addPost(postDetails);

    switch (postDetails.type) {
        case 'thread':
            loadChannel(postDetails.channelId);
            break;
        case 'threadPost':
            loadPost(postDetails.threadId, { anchorToBottom: true });
            break;
    }
}

export function postToggleLiked(postId) {
    if (!checkLoggedIn()) { return; }

    const targetPostModel = getPost(postId);
    const targetPost = get(targetPostModel);

    if (targetPost) {
        setLikePost(targetPost, !targetPost.liked);
        targetPostModel.set(targetPost);
        checkUpdatePost(targetPost);
    }
}

export function copyPostLink(postId) {
    const url = location.protocol + '//' + location.host + '/posts/' + postId;
    copyToClipboard(url);
}