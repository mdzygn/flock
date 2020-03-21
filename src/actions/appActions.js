import { goto } from '@sapper/app';
import { get } from 'svelte/store';

import { getProject } from '../data/projects';
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

    project,
    conversation,
    viewedUser,

    resetScrollRegionPosition,
} from '../models/appState';

import {
    returnView,
    showingInfo,
} from '../models/projectViewState.js';

export function loadProject(targetProjectId, options) {
    // console.log('loadProject', targetProjectId);

    projectId.set(targetProjectId);

    const curProject = getProject(targetProjectId);
    project.set(curProject);

    let isNew = false;
    if (options && options.isNew) {
        isNew = true;
    }
    if (curProject) {
        if (isNew) {
            curProject.isNew = true;
            curProject.isOwner = true;
            curProject.hasCreated = true;
            curProject.projectHasDetails = false;
        }
    }
    // hasCreated.set(isNew);

    showingInfo.set(options && options.showInfo);

    returnView.set(curProject && (curProject.following || curProject.isOwner));

    gotoRoute('projects/' + targetProjectId);
    resetScrollRegionPosition('project');
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
export function hideProjectInfo() {
    showingInfo.set(false);
}

function getPagePath() {
    return get(curPath);
}

export function showProjectFollowers(targetProjectId) {
    gotoRoute('projects/' + targetProjectId + '/followers');
    resetScrollRegionPosition('followers');
}