import { goto } from '@sapper/app';
import { get } from 'svelte/store';

import {
    projectId,
    channelId,
    threadId,
    conversationId,
    profileId,
    viewingOwnProfile,
    viewingGroupConversation,
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
    profileId.set(targetProfileId);

    let isProfileOwner = false;
    if (options && options.owner) {
        isProfileOwner = options.owner;
    }
    viewingOwnProfile.set(isProfileOwner);

    goto('profile/' + targetProfileId );
    resetScrollRegionPosition('profile');
}

export function loadConversation(targetConversationId, options) {
    conversationId.set(targetConversationId);

    let isGroupConversation = false;
    if (options && options.group) {
        isGroupConversation = options.group;
    }

    if (get(viewingGroupConversation) != isGroupConversation) {
        viewingGroupConversation.set(isGroupConversation);
        resetScrollRegionPosition('conversation');
    }

    goto('messages/' + targetConversationId );
}

export function showProjectInfo() {
    showingInfo.set(true);
}