import { writable } from 'svelte/store';
import { onDestroy } from 'svelte'; // afterUpdate

import projects from '../data/projects';

const projectModels = {};

export function getProject(projectId) {
	return projects.find(item => item.id === projectId);
}

export function getProjectModel(projectId) {
	let projectModel = projectModels[projectId];
	if (!projectModel) {
		let sourceProjectModel = projects.find(item => item.id === projectId);
		projectModel = writable(sourceProjectModel);
		projectModels[projectId] = projectModel;
	}
	return projectModel;
}

// $project $ operator doesn't work in SSR for dynamically set model
export function linkProject(projectId, updateCallback) {
    const projectModel = getProjectModel(projectId);
    let project, unbindProjectModel = projectModel && projectModel.subscribe(updateCallback);
	onDestroy(e => unbindProjectModel && unbindProjectModel());
	return project;
}

export function getProjectsByIds(projectIds, limit) {
	let projectItems = null;
	if (projectIds) {
		projectItems = [];
		let curProject, projectId;
		for (let index = 0; index < projectIds.length; index++) {
			if (!limit || index < limit) {
				projectId = projectIds[index];
				curProject = getProject(projectId);
				if (curProject) {
					projectItems.push(curProject);
				}
			}
		}
	}
	return projectItems;
}

export function getMyProjects() {
	return projects.filter(section => section.isOwner);
}

export function getFollowingProjects() {
	return projects.filter(section => section.following);
}

export function getMyProjectIds() {
	return getMyProjects().map(project => project.id);
}

export function getFollowingProjectIds() {
	return getFollowingProjects().map(project => project.id);
}