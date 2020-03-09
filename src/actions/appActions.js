import { goto } from '@sapper/app';
// import { get } from 'svelte/store';

import { projectId } from '../models/appState';

import { following, owner } from '../models/projectViewState.js';

export function loadProject(targetProjectId, options) {
    projectId.set(targetProjectId);

    if (options && options.owner) {
        owner.set(true);
        following.set(false);
    } else if (options && options.following) {
        owner.set(false);
        following.set(true);
    } else {
        owner.set(false);
        following.set(false);
    }

    goto('projects/' + targetProjectId);
}

export function createProject() {
    goto('projects/create');
}