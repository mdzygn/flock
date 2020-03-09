import { goto } from '@sapper/app';
import { get } from 'svelte/store';

import { following, owner } from './projectViewState.js';

import { createModel } from '../utils/createModel';

const appState = createModel({
    projectId: 'm62lsp2o',

    viewMode: 'discover',
    locationMode: 'global',
    exploreZoomed: false,
}, {persist: true});

export const projectId = appState.projectId;
export const viewMode = appState.viewMode;
export const locationMode = appState.locationMode;
export const exploreZoomed = appState.exploreZoomed;

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
    console.log('owner ' + get(owner));

    goto('projects/' + targetProjectId);
}

export function createProject() {
    goto('projects/create');
}

export default appState;