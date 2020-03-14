import { get } from 'svelte/store';
import { DEBUG } from '../config';

import { getProject } from '../data/projects';
import { project } from '../models/appState';

export function projectToggleFollowing(projectId) {
    const targetProject = getProject(projectId);
    if (targetProject) {
        targetProject.following = !targetProject.following;
        checkUpdateProject(targetProject);
    }
}

export function projectToggleLiked(projectId) {
    const targetProject = getProject(projectId);
    if (targetProject) {
        targetProject.liked = !targetProject.liked;
        checkUpdateProject(targetProject);
    }
}

function checkUpdateProject(targetProject) {
    const curProject = get(project);
    if (curProject && targetProject === curProject) {
        project.set(curProject);
    }
}