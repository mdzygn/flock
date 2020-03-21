import { get } from 'svelte/store';
import { DEBUG } from '../config';

import { goto } from '@sapper/app';

import { getProjectModel } from '../models/projectsModel';
import {
    project,
    resetScrollRegionPosition
} from '../models/appState';

import {
    showProjectInfo,
} from '../actions/appActions.js';

export function projectToggleFollowing(projectId) {
    const targetProjectModel = getProjectModel(projectId);
    const targetProject = get(targetProjectModel);
    if (targetProject) {
        targetProject.following = !targetProject.following;
        targetProject.followCount += targetProject.following ? 1 : -1;
        targetProjectModel.set(targetProject);
        checkUpdateProject(targetProject);
    }
}

export function projectToggleLiked(projectId) {
    const targetProjectModel = getProjectModel(projectId);
    const targetProject = get(targetProjectModel);
    if (targetProject) {
        targetProject.liked = !targetProject.liked;
        targetProject.likeCount += targetProject.liked ? 1 : -1;
        targetProjectModel.set(targetProject);
        checkUpdateProject(targetProject);
    }
}

export function makePublic() {
    const curProject = get(project);
    if (curProject) {
        curProject.public = true;
        curProject.isNew = false;
        project.set(curProject);
    }
}

export function togglePublic() {
    const curProject = get(project);
    if (curProject) {
        curProject.public = !curProject.public;
        project.set(curProject);
    }
}

export function saveProjectDetails(details) {
    const curProject = get(project);
    if (curProject) {
        curProject.projectHasDetails = true;
        project.set(curProject);

        goto('projects/' + curProject.id);
        showProjectInfo();
        resetScrollRegionPosition('project');
    }
}

function checkUpdateProject(targetProject) {
    const curProject = get(project);
    if (curProject && targetProject === curProject) {
        project.set(curProject);
    }
}