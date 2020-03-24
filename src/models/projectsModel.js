import { writable } from 'svelte/store';

import { generateId } from '../utils/utils';

import config from '../config';

import projectsData from '../data/projects';

import ProjectModel from '../models/projectModel';

const projects = JSON.parse(JSON.stringify(projectsData));

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

export function getProjectsByIds(projectIds, options) {
	let searchString = (options && options.searchString) || null;
	let limit = (options && options.limit) || 0;

	let projectItems = null;
	if (projectIds) {
		projectItems = [];
		let curProject, projectId;
		for (let index = 0; index < projectIds.length; index++) {
			if (!limit || index < limit) {
				projectId = projectIds[index];
				curProject = getProject(projectId);
				if (curProject) {
					if (!searchString || projectSearchMatch(curProject, searchString)) {
						projectItems.push(curProject);
					}
				}
			}
		}
	}
	return projectItems;
}

function projectSearchMatch(project, searchString) {
	searchString = searchString.toLowerCase();

	if (project.title.toLowerCase().includes(searchString)) return true;
	if (project.description.toLowerCase().includes(searchString)) return true;
	if (project.location.toLowerCase().includes(searchString)) return true;
	return false;
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

export function addProject(projectDetails) {
    let projectId, trialIndex;
	do { projectId = generateId(); } while (getProject(projectId) && trialIndex < 99);
	if (trialIndex === 99) { return null; }

	const newProjectModel = Object.assign({}, ProjectModel);

	newProjectModel.id = projectId;

	newProjectModel.headerImage = projectDetails.headerImage || null;
	newProjectModel.title = projectDetails.title || '';
	newProjectModel.description = projectDetails.description || '';

    newProjectModel.isOwner = true;
	newProjectModel.following = true;

	newProjectModel.isNew = true;
	newProjectModel.hasCreated = true;
	newProjectModel.projectHasDetails = false;

	newProjectModel.followCount++;

	projects.push(newProjectModel);

	return newProjectModel;
}

export function getProjectHeaderImage(project) {
	if (project) {
		if (project.headerImage) {
			return config.contentFolder + project.headerImage;
		} else {
			const headerImageId = project.slug || '_default';
			return config.projectContentFolder + headerImageId + '/' + config.projectHeaderImage;
		}
	}
	return null;
}