import { get } from 'svelte/store';
import { goto } from '@sapper/app';
import { tick } from 'svelte';

// import { DEBUG } from '../config';

import { copyToClipboard } from '../utils';

import promptIds from '../config/promptIds';

import {
    addProject,
    updateProject,
    getProject,
    setFollowProject,
    setLikeProject,
} from '../models/projectsModel';

import {
    project,
    resetScrollRegionPosition,
    getIsProjectTeamMember,
} from '../models/appModel';

import {
    loadProject,
    showProjectInfo,
    showPrompt,
    checkLoggedIn,
} from '../actions/appActions';

function checkUpdateProject(targetProject) {
    const curProject = get(project);
    if (curProject && curProject.id === targetProject.id) {
        project.set(targetProject);
    }
}

export function projectToggleFollowing(projectId) {
    if (!checkLoggedIn()) { return; }

    const targetProjectModel = getProject(projectId);
    const targetProject = get(targetProjectModel);
    if (targetProject) {
        setFollowProject(targetProject, !targetProject.following);
        // updateProject(targetProject, {
        //     following: !targetProject.following,
        //     followCount: targetProject.followCount + (!targetProject.following ? 1 : -1),
        // });

        targetProjectModel.set(targetProject);
        checkUpdateProject(targetProject);
    }
}

export function projectToggleLiked(projectId) {
    if (!checkLoggedIn()) { return; }

    const targetProjectModel = getProject(projectId);
    const targetProject = get(targetProjectModel);

    if (targetProject) {
        setLikeProject(targetProject, !targetProject.liked);
        // updateProject(targetProject, {
        //     liked: !targetProject.liked,
        //     likeCount: targetProject.likeCount + (!targetProject.liked ? 1 : -1),
        // });
        targetProjectModel.set(targetProject);
        checkUpdateProject(targetProject);
    }
}

export async function makePublic() {
    if (!checkLoggedIn()) { return; }

    const curProject = get(project);
    if (curProject) {
        updateProject(curProject, {
            public: true,
            isNew: false,
        });
        project.set(curProject);

        await tick();
        showPrompt(promptIds.MAKE_PUBLIC_COMPLETE);
    }
}

export async function makePrivate() {
    if (!checkLoggedIn()) { return; }

    const curProject = get(project);
    if (curProject) {
        updateProject(curProject, {
            public: false,
        });
        project.set(curProject);

        await tick();
        showPrompt(promptIds.MAKE_PRIVATE_COMPLETE);
    }
}

// export async function togglePublic() {
//     const curProject = get(project);
//     if (curProject) {
//         const details = {
//             public: !curProject.public,
//         }
//         if (details.public) {
//             details.isNew = false;
//         }
//         updateProject(curProject, details);
//         project.set(curProject);
//     }
// }

export function saveProjectDetails(projectDetails, options) {
    if (!checkLoggedIn()) { return; }

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
    if (!checkLoggedIn()) { return; }

    if (projectDetails.headerImage) {
        projectDetails.headerImage = projectDetails.headerImage;
        // projectDetails.headerImage = 'resource/headers/' + projectDetails.headerImage + '.jpg';
    }

    const newProjectModel = addProject(projectDetails);
    const newProject = get(newProjectModel);

    if (newProject) {
        loadProject(newProject.id);
    }
}

export function reportProject(projectId) {
    if (!checkLoggedIn()) { return; }

    const targetProjectModel = getProject(projectId);
    const targetProject = get(targetProjectModel);

    targetProject.reported = true;
    targetProjectModel.set(targetProject);
    checkUpdateProject(targetProject);

    // TODO: report project
}

export async function archiveProject(projectId) {
    if (!checkLoggedIn()) { return; }

    const targetProjectModel = getProject(projectId);
    const targetProject = get(targetProjectModel);

    if (getIsProjectTeamMember(targetProject)) { // targetProject.isOwner) {
        const details = { archived: true };
        targetProject.archived = details.archived;
        targetProjectModel.set(targetProject);
        checkUpdateProject(targetProject);
        updateProject(targetProject, details, true);
        resetScrollRegionPosition('project');

        await tick();
        showPrompt(promptIds.PROJECT_ARCHIVED);
    }
}

export async function unarchiveProject(projectId) {
    if (!checkLoggedIn()) { return; }

    const targetProjectModel = getProject(projectId);
    const targetProject = get(targetProjectModel);

    if (getIsProjectTeamMember(targetProject)) { // targetProject.isOwner) {
        const details = { archived: false };
        targetProject.archived = details.archived;
        targetProjectModel.set(targetProject);
        checkUpdateProject(targetProject);
        updateProject(targetProject, details, true);

        await tick();
        showPrompt(promptIds.PROJECT_UNARCHIVED);
    }
}

export function copyProjectLink(projectId) {
    const url = location.protocol + '//' + location.host + '/projects/' + projectId;
    copyToClipboard(url);
}