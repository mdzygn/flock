import api from '../api';

import { writable } from 'svelte/store';

import { generateId } from '../utils/utils';

import config from '../config';

import ProjectModel from '../models/projectModel';

// import projectsData from '../data/projects';
// const projects = JSON.parse(JSON.stringify(projectsData));

let projects = [];

const projectModels = {};

loadProjects();

function loadProjects() {
	api.get('projects').then(result => {
		// console.log('projects loaded: ', result);
		projects = result;
	}).catch(e => { console.error(e); });
}

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

	if (project.title && project.title.toLowerCase().includes(searchString)) return true;
	if (project.description && project.description.toLowerCase().includes(searchString)) return true;
	if (project.location && project.location.toLowerCase().includes(searchString)) return true;
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

	newProjectModel.createdAt = (new Date()).getTime();
	newProjectModel.lastActiveAt = newProjectModel.createdAt;

    newProjectModel.isOwner = true;
	newProjectModel.following = true;

	newProjectModel.isNew = true;
	newProjectModel.hasCreated = true;

	newProjectModel.followCount++;

	projects.unshift(newProjectModel);

	api.post('projects', newProjectModel).then(result => {
		// console.log('project added: ', result);
		newProjectModel._id = result.insertedId;
	}).catch(e => { console.error(e); });

	return newProjectModel;
}

export function updateProject(project, projectDetails) {
	projectDetails._id = project._id;

	Object.assign(project, projectDetails);

	api.put('projects', projectDetails).then(result => {
		// console.log('project updated: ', result);
	}).catch(e => { console.error(e); });
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

export function getProjectHasDetails(project) {
	const projectDetails = project && project.details;
	if (projectDetails && (
		(projectDetails[0] && projectDetails[0].detail) ||
		(projectDetails[1] && projectDetails[1].detail) ||
		(projectDetails[2] && projectDetails[2].detail) ||
		(projectDetails[3] && projectDetails[3].detail)
	)) {
		return true;
	}
	return false;
}