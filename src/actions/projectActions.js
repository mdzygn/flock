import { get } from 'svelte/store';
// import { DEBUG } from '../config';

import { copyToClipboard } from '../utils';

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

function checkUpdateProject(targetProject) {
    const curProject = get(project);
    if (curProject && curProject.id === targetProject.id) {
        project.set(targetProject);
    }
}

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

export function createProject(projectDetails) {
    if (projectDetails.headerImage) {
        projectDetails.headerImage = 'resource/headers/' + projectDetails.headerImage + '.jpg';
    }

    const newProject = addProject(projectDetails);

    if (newProject) {
        loadProject(newProject.id);
    }
}

export function reportProject(projectId) {
    const targetProjectModel = getProject(projectId);
    const targetProject = get(targetProjectModel);

    targetProject.reported = true;
    targetProjectModel.set(targetProject);
    checkUpdateProject(targetProject);

    // TODO: report project
}

export function archiveProject(projectId) {
    const targetProjectModel = getProject(projectId);
    const targetProject = get(targetProjectModel);

    if (targetProject.isOwner) {
        targetProject.archived = true;
        targetProjectModel.set(targetProject);
        checkUpdateProject(targetProject);

        // TODO: unarchive in db
    }
}

export function unarchiveProject(projectId) {
    const targetProjectModel = getProject(projectId);
    const targetProject = get(targetProjectModel);

    if (targetProject.isOwner) {
        targetProject.archived = false;
        targetProjectModel.set(targetProject);
        checkUpdateProject(targetProject);

        // TODO: unarchive in db
    }
}

export function copyProjectLink(projectId) {
    const url = location.protocol + '//' + location.host + '/projects/' + projectId;
    copyToClipboard(url);
}