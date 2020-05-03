import { get } from 'svelte/store';
import { goto } from '@sapper/app';

import {
    checkLoggedIn,
    loadChannel,
    loadPost,
} from '../actions/appActions';

import {
    post,
    resetScrollRegionPosition,
} from '../models/appModel';

import {
    addPost,
    setLikePost,
    getPost,
    updatePost,
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

export function savePost(postDetails) {
    if (!checkLoggedIn()) { return; }

    const curPost = get(post);
    if (curPost) {
        updatePost(curPost, postDetails);
        post.set(curPost);

        if (curPost.type === 'thread') {
            goto('posts/' + curPost.id);
        } else {
            goto('posts/' + curPost.threadId);
        }
        resetScrollRegionPosition('thread');
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