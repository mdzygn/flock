import { get } from 'svelte/store';
import { goto } from '@sapper/app';

import promptIds from '../config/promptIds';

import {
    checkLoggedIn,
    loadChannel,
    // removePostFromChannel,
    loadPost,
    showPrompt,
} from '../actions/appActions';

import AppModel, {
    post,
    resetScrollRegionPosition,
} from '../models/appModel';

import {
    addPost,
    setLikePost,
    setFollowPost,
    getPost,
    updatePost,
    deletePost,
} from '../models/postsModel';

AppModel.on('followPost', followPost);
AppModel.on('deletePost', removePost);

function checkUpdatePost(targetPost) {
    const curPost = get(post);
    if (curPost && curPost.id === targetPost.id) {
        post.set(targetPost);
    }
}

export function createPost(postDetails) {
    if (!checkLoggedIn()) { return; }

    const result = addPost(postDetails);
    if (result) {
        result.then((result) => {
            if (result && !result.error) {
                switch (postDetails.type) {
                    case 'thread':
                        loadChannel(postDetails.channelId);
                        break;
                    case 'threadPost':
                        loadPost(postDetails.threadId, { anchorToBottom: true });
                        break;
                }
            }
        });
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

export function removePost(curPost) {
    if (!checkLoggedIn()) { return; }

    let result = null;
    if (curPost) {
        let curThreadId = null;
        let curChannelId = null;

        if (curPost.type !== 'thread' && curPost.threadId) {
            curThreadId = curPost.threadId;
        } else if (curPost.channelId) {
            curChannelId = curPost.channelId;
        }

        result = deletePost(curPost);
        if (result) {
            result.then((result) => {
                if (result && !result.error) {
                    // post.set(null); // should do if viewing thread that is post?
                    if (curThreadId) {
                        // let curPostId = get(postId);
                        // postId.set(curPostId); // force posts list to update in [posts]/index

                        loadPost(curThreadId); // should use?
                        // goto('posts/' + curThreadId);
                        // resetScrollRegionPosition('thread');
                    } else if (curChannelId) {
                        // removePostFromChannel(curChannelId, curPostId);
                        loadChannel(curChannelId);

                        // goto('channels/' + curPost.channelId);
                        // resetScrollRegionPosition('channel');
                    }
                    setTimeout(() => {
                        showPrompt(promptIds.DELETE_POST_COMPLETE);
                    }, 500);
                }
            });
        }
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
        const updated = setFollowPost(targetPost, unfollow);

        if (updated) {
            targetPostModel.set(targetPost);
            checkUpdatePost(targetPost);
        }
    }
}