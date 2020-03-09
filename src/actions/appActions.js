import { goto } from '@sapper/app';
import { get } from 'svelte/store';

import {
    projectId,
    profileId,
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
    } else if (options && options.owner) {
        isNew.set(false);
        hasCreated.set(false);
        owner.set(true);
        following.set(false);
    } else if (options && options.following) {
        isNew.set(false);
        hasCreated.set(false);
        owner.set(false);
        following.set(true);
    } else {
        isNew.set(false);
        hasCreated.set(false);
        owner.set(false);
        following.set(false);
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

export function createProject(targetProjectId) {
    loadProject(targetProjectId, {isNew: true});
}

export function makePublic() {
    isNew.set(false);
}

export function showLikes() {
    const test = get(profileId);
    const test2 = get(projectId);
    goto('profile/' + get(profileId) + '/likes');
    resetScrollRegionPosition('likes');
}