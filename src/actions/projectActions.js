import { get } from 'svelte/store';
import { DEBUG } from '../config';

import { getProjectModel } from '../data/projects';
import { project } from '../models/appState';

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

function checkUpdateProject(targetProject) {
    const curProject = get(project);
    if (curProject && targetProject === curProject) {
        project.set(curProject);
    }
}