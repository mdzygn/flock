import { goto } from '@sapper/app';
// import { get } from 'svelte/store';

import { projectId } from '../models/appState';

import { following, owner, isNew } from '../models/projectViewState.js';

export function loadProject(targetProjectId, options) {
    projectId.set(targetProjectId);

    if (options && options.isNew) {
        isNew.set(true);
        owner.set(true);
        following.set(false);
    } else if (options && options.owner) {
        isNew.set(false);
        owner.set(true);
        following.set(false);
    } else if (options && options.following) {
        isNew.set(false);
        owner.set(false);
        following.set(true);
    } else {
        isNew.set(false);
        owner.set(false);
        following.set(false);
    }

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