import { writable } from 'svelte/store';
import { onDestroy } from 'svelte'; // afterUpdate

import projects from '../data/projects';

const projectModels = {};

testDuplicates();

function testDuplicates() {
	const usedIds = {};
	projects.forEach(item => {
		if (usedIds[item.id]) {
			console.warn('Project "' + item.title + '" has same id "' + item.id + '" as "' + usedIds[item.id].title + '"');
		} else {
			usedIds[item.id] = item;
		}
	});
}

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
export function linkProject(projectId, updateCallback, existingUnbindProjectModel) {
	if (existingUnbindProjectModel) {
		existingUnbindProjectModel();
	}
	const projectModel = getProjectModel(projectId);
	const unbindProjectModel = projectModel && projectModel.subscribe(updateCallback);
	onDestroy(e => unbindProjectModel && unbindProjectModel());
	return unbindProjectModel;
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
	return projects.filter(section => section.following && !section.isOwner);
}

export function getOtherProjects() {
	return projects.filter(section => !section.following && !section.isOwner);
}

export function getDiscoveryProjects(options) {
	const otherProjects = getOtherProjects();
	const ownedProjects = getMyProjects();
	const followingProjects = getFollowingProjects();

	let projects = [...otherProjects, ...ownedProjects, ...followingProjects];

	if (options && options.location === 'local') {
		const testArrayCycleOffset = Math.min(4, projects.length - 1);
		projects = projects.slice(testArrayCycleOffset, projects.length).concat(projects.slice(0, testArrayCycleOffset));
	}

	return projects;
}


export function getMyProjectIds() {
	return getMyProjects().map(project => project.id);
}

export function getFollowingProjectIds() {
	return getFollowingProjects().map(project => project.id);
}

export function getDiscoveryProjectIds(options) {
	return getDiscoveryProjects(options).map(project => project.id);
}