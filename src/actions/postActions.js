import { get } from 'svelte/store';
import { goto } from '@sapper/app';

import promptIds from '../config/promptIds';

import {
    checkLoggedIn,
    loadChannel,
    // removePostFromChannel,
    loadPost,
    loadProject,
    showPrompt,
    closeOverlay,
} from '../actions/appActions';

import AppModel, {
    post,
    resetScrollRegionPosition,
    triggerCreatedPost,
} from '../models/appModel';

import {
    addPost,
    setLikePost,
    setFollowPost,
    getPost,
    updatePost,
    deletePost,
    checkUpdatePost,
} from '../models/postsModel';

AppModel.on('followPost', followPost);
AppModel.on('deletePost', removePost);

export function createPost(postDetails) {
    if (!checkLoggedIn()) { return; }

    const result = addPost(postDetails);
    if (result) {
        result.then((result) => {
            if (result && !result.error) {
                triggerCreatedPost(postDetails);
                switch (postDetails.type) {
                    case 'thread':
                        // don't redirect as already on the channel page
                        // loadChannel(postDetails.channelId);
                        break;
                    case 'threadPost':
                        // don't redirect as already on the post page
                        // loadPost(postDetails.threadId, { anchorToBottom: true });
                        break;
                    case 'projectPost':
                        // don't redirect as already on the project page
                        // loadProject(postDetails.projectId);
                        // loadPost(postDetails.id);
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

        if (curPost.type === 'thread' || curPost.type === 'projectPost') {
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
        let curProjectId = null;
        let curThreadId = null;
        let curChannelId = null;

        if (curPost.type === 'projectPost' && curPost.projectId) {
            curProjectId = curPost.projectId;
        } else if (curPost.type === 'threadPost' && curPost.threadId) {
            curThreadId = curPost.threadId;
        } else if (curPost.channelId) {
            curChannelId = curPost.channelId;
        }

        showPrompt(promptIds.DELETE_POST_PROCESSING);
        result = deletePost(curPost);
        if (result) {
            result.then((result) => {
                closeOverlay();
                if (result && !result.error) {
                    // post.set(null); // should do if viewing thread that is post?
                    if (curProjectId) {
                        loadProject(curProjectId); 
                        setTimeout(() => {
                            showPrompt(promptIds.DELETE_POST_COMPLETE);
                        }, 200);
                    } else if (curThreadId) {
                        // let curPostId = get(postId);
                        // postId.set(curPostId); // force posts list to update in [posts]/index

                        loadPost(curThreadId); // should use?
                        // goto('posts/' + curThreadId);
                        // resetScrollRegionPosition('thread');
                        showPrompt(promptIds.DELETE_POST_COMPLETE);
                    } else if (curChannelId) {
                        // removePostFromChannel(curChannelId, curPostId);
                        loadChannel(curChannelId);

                        // goto('channels/' + curPost.channelId);
                        // resetScrollRegionPosition('channel');
                        setTimeout(() => {
                            showPrompt(promptIds.DELETE_POST_COMPLETE);
                        }, 200);
                    }
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
        setLikePost(targetPost, targetPostModel, !targetPost.liked);
        // checkUpdatePost(targetPost);
    }
}

export function followPost(postId, unfollow) {
    if (!checkLoggedIn()) { return; }

    const targetPostModel = getPost(postId);
    const targetPost = get(targetPostModel);
    if (targetPost) {
        const updated = setFollowPost(targetPost, targetPostModel, unfollow);

        // if (updated) {
        //     checkUpdatePost(targetPost);
        // }
    }
}