import { get } from 'svelte/store';
import { DEBUG } from '../config';

import { goto } from '@sapper/app';

import {
    addProject,
    updateProject,
    getProjectModel,
} from '../models/projectsModel';

import {
    project,
    resetScrollRegionPosition
} from '../models/appModel';

import {
    loadProject,
    showProjectInfo,
} from '../actions/appActions';

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

export function saveProjectDetails(projectDetails, options) {
    const curProject = get(project);
    if (curProject) {
        // if (projectDetails.details) {
        //     curProject.details = projectDetails.details;
        // }
        // if (projectDetails.title !== undefined) {
        //     curProject.title = projectDetails.title;
        // }
        // if (projectDetails.description !== undefined) {
        //     curProject.description = projectDetails.description;
        // }
        // if (projectDetails.headerImage !== undefined) {
        //     curProject.headerImage = projectDetails.headerImage;
        // }
        updateProject(curProject, projectDetails);
        project.set(curProject);

        goto('projects/' + curProject.id);
        if (options && options.showProjectInfo) {
            showProjectInfo();
        }
        resetScrollRegionPosition('project');
    }
}

function checkUpdateProject(targetProject) {
    const curProject = get(project);
    if (curProject && targetProject === curProject) {
        project.set(curProject);
    }
}

export function createProject(projectDetails) {
    if (projectDetails.headerImage) {
        projectDetails.headerImage = 'resource/headers/' + projectDetails.headerImage + '.jpg';
    }

    const newProject = addProject(projectDetails);

    if (newProject) {
        loadProject(newProject.id);
    }
}