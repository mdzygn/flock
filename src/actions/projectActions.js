import { get } from 'svelte/store';
import { DEBUG } from '../config';

import { goto } from '@sapper/app';

import {
    addProject,
    updateProject,
    getProject,
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
    const targetProjectModel = getProject(projectId);
    const targetProject = get(targetProjectModel);
    if (targetProject) {
        updateProject(targetProject, {
            following: !targetProject.following,
            followCount: targetProject.followCount + (!targetProject.following ? 1 : -1),
        });
        targetProjectModel.set(targetProject);
        checkUpdateProject(targetProject);
    }
}

export function projectToggleLiked(projectId) {
    const targetProjectModel = getProject(projectId);
    const targetProject = get(targetProjectModel);
    if (targetProject) {
        updateProject(targetProject, {
            liked: !targetProject.liked,
            likeCount: targetProject.likeCount + (!targetProject.liked ? 1 : -1),
        });
        targetProjectModel.set(targetProject);
        checkUpdateProject(targetProject);
    }
}

export function makePublic() {
    const curProject = get(project);
    if (curProject) {
        updateProject(curProject, {
            public: true,
            isNew: false,
        });
        project.set(curProject);
    }
}

export function makePrivate() {
    const curProject = get(project);
    if (curProject) {
        updateProject(curProject, {
            public: false,
        });
        project.set(curProject);
    }
}

export function togglePublic() {
    const curProject = get(project);
    if (curProject) {
        const details = {
            public: !curProject.public,
        }
        if (details.public) {
            details.isNew = false;
        }
        updateProject(curProject, details);
        project.set(curProject);
    }
}

export function saveProjectDetails(projectDetails, options) {
    const curProject = get(project);
    if (curProject) {
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

export function reportProject(targetProject) {
    const curProject = get(project);
    if (curProject && targetProject === curProject) {
        curProject.reported = true;
        project.set(curProject);

        // TODO: report project
    }
}