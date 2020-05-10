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
    setFollowPost,
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

    const result = addPost(postDetails);

    switch (postDetails.type) {
        case 'thread':
            loadChannel(postDetails.channelId);
            break;
        case 'threadPost':
            loadPost(postDetails.threadId, { anchorToBottom: true });
            break;
    }
    return result;
}

export function savePost(postDetails) {
    if (!checkLoggedIn()) { return; }

    const curPost = get(post);
    let result = null;
    if (curPost) {
        result = updatePost(curPost, postDetails);
        post.set(curPost);

        if (curPost.type === 'thread') {
            goto('posts/' + curPost.id);
        } else {
            goto('posts/' + curPost.threadId);
        }
        resetScrollRegionPosition('thread');
    }
    return result;
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

export function followPost(postId, unfollow) {
    if (!checkLoggedIn()) { return; }

    const targetPostModel = getPost(postId);
    const targetPost = get(targetPostModel);
    if (targetPost) {
        setFollowPost(targetPost, unfollow);

        targetPostModel.set(targetPost);
        checkUpdatePost(targetPost);
    }
}