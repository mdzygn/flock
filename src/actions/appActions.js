import { goto } from '@sapper/app';
import { get } from 'svelte/store';

import conversations from '../data/conversations';
import users from '../data/users';

// const { page } = stores();

import {
    curPath,

    projectId,
    channelId,
    threadId,
    conversationId,
    profileId,

    conversation,
    viewedUser,

    resetScrollRegionPosition,
} from '../models/appState';

import {
    returnView,
    following,
    owner,
    isNew,
    hasCreated,
    showingInfo,
    liked,
} from '../models/projectViewState.js';

export function loadProject(targetProjectId, options) {
    projectId.set(targetProjectId);

    if (options && options.isNew) {
        isNew.set(true);
        hasCreated.set(true);
        owner.set(true);
        following.set(false);
        liked.set(false);
    } else if (options && options.owner) {
        isNew.set(false);
        hasCreated.set(false);
        owner.set(true);
        following.set(false);
        liked.set(false);
    } else if (options && options.following) {
        isNew.set(false);
        hasCreated.set(false);
        owner.set(false);
        following.set(true);
        liked.set(false);
    } else {
        isNew.set(false);
        hasCreated.set(false);
        owner.set(false);
        following.set(false);
        liked.set(false);
    }

    showingInfo.set(false);
    returnView.set(get(following) || get(owner) || get(liked));

    resetScrollRegionPosition('project');

    goto('projects/' + targetProjectId);
}

export function loadProjectPost(targetProjectId) {
    loadProject(targetProjectId + '#post');
}

export function newProject() {
    goto('projects/new');
}
export function editProjectDetails() {
    goto('projects/' + get(projectId) + '/details');
}

export function createProject(targetProjectId) {
    loadProject(targetProjectId, {isNew: true});
}

export function makePublic() {
    isNew.set(false);
}

export function showLikes() {
    goto('profile/' + get(profileId) + '/likes');
    resetScrollRegionPosition('likes');
}

export function loadThread(targetThreadId) {
    threadId.set(targetThreadId);

    goto('threads/' + targetThreadId );
    resetScrollRegionPosition('thread');
}

export function loadChannel(targetChannelId) {
    channelId.set(targetChannelId);

    goto('channels/' + targetChannelId );
    resetScrollRegionPosition('channel');
}

export function loadProfile(targetProfileId, options) {
    // console.log('targetProfileId: ' + targetProfileId);

    profileId.set(targetProfileId);

    const curUser = users.find(item => item.id === targetProfileId);
    viewedUser.set(curUser);

    gotoRoute('profile/' + targetProfileId);
    resetScrollRegionPosition('profile');
}

export function loadConversation(targetConversationId) {
    // console.log('loadConversation: ' + targetConversationId);

    conversationId.set(targetConversationId);

    const curConversation = conversations.find(item => item.id === targetConversationId);
    conversation.set(curConversation);

    gotoRoute('messages/' + targetConversationId);
    resetScrollRegionPosition('conversation');
}

function gotoRoute(newPath) {
    // console.log(getPagePath()+ ' !== /' + newPath + ' : ' + (getPagePath() !== '/' + newPath));
    if (getPagePath() !== '/' + newPath) {
        goto(newPath);
    }
}

export function showProjectInfo() {
    showingInfo.set(true);
}

function getPagePath() {
    return get(curPath);
}