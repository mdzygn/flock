import { get } from 'svelte/store';

import {
    checkLoggedIn,
    loadChannel,
    loadPost,
} from '../actions/appActions';

import {
    addPost,
} from '../models/postsModel';

export function createPost(postDetails) {
    if (!checkLoggedIn()) { return; }

    addPost(postDetails);

    switch (postDetails.type) {
        case 'thread':
            loadChannel(postDetails.channelId);
            break;
        case 'threadPost':
            loadPost(postDetails.threadId);
            break;
    }
}