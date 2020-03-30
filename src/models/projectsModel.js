import api from '../api';

import { writable, get } from 'svelte/store';

import { generateId } from '../utils';

import config from '../config';

import { locationMode } from '../models/appModel';

import ProjectModel from '../models/projectModel';

// import projectsData from '../data/projects.json';
// const projects = JSON.parse(JSON.stringify(projectsData));

export let loadingProjects = writable(false);

let projectsUpdatedHandlers = [];
let tempProjectsUpdatedHandlers = [];

let projects = writable([]);
let myProjects = writable([]);
let myPublicProjects = writable([]);
let archivedProjects = writable([]);
let followingProjects = writable([]);
let otherProjects = writable([]);
let discoveryProjects = writable([]);

onProjectsUpdated(projectsUpdated);

// let projects = [];
// loadProjects();

export function loadProjects(options) {
	if (!get(loadingProjects)) {
		loadingProjects.set(true);
		api.getProjects(options).then(result => {
			mergeProjects(result);
			loadingProjects.set(false);
		});
	}
}

export function onProjectsUpdated(handler) {
	if (!projectsUpdatedHandlers.includes(handler)) {
		projectsUpdatedHandlers.push(handler);
	}
}

export function onTempProjectsUpdated(handler) {
	if (!tempProjectsUpdatedHandlers.includes(handler)) {
		tempProjectsUpdatedHandlers.push(handler);
	}
}

projects.subscribe(() => {
	projectsUpdatedHandlers.forEach(handler => {
		handler();
	});

	tempProjectsUpdatedHandlers.forEach(handler => {
		handler();
	});
	tempProjectsUpdatedHandlers.length = 0;
});

function mergeProjects(newProjects) {
	// projects.set(projects);

	if (newProjects && newProjects.length) {
		const curProjects = get(projects);

		let curProject, newProjectData, projectId, newProject;
		// newProjects.forEach(newProjectData => {
		for (var projectI = 0; projectI < newProjects.length; projectI++) {
			newProjectData = newProjects[projectI];
			projectId = newProjectData.id;
			curProject = curProjects.find(match => get(match).id === projectId);
			if (!curProject) {
				curProject = ProjectModel(newProjectData);
				curProjects.unshift(curProject);
				// console.log('add project: ', curProject, newProjectData);
			} else {
				// console.log('update existing project: ', curProject, newProjectData);
				newProject = get(curProject);
				newProject = Object.assign(newProject, newProjectData);
				curProject.set(newProject);
			}
		}
		// console.log('update projects: ', curProjects);

		projects.set(curProjects);
	}
}

export function getProject(projectId) {
	return get(projects).find(item => get(item).id === projectId);
}

export function getUserProjectsFromId(filteredProjects, projectIds, dontLoad) {
	loadProjects();

	let projectItems = [];

	const curProjects = get(projects);
	if (curProjects && curProjects.length) {
		if (projectIds) {
			projectItems = [];

			let project, projectId;
			for (let index = 0; index < projectIds.length; index++) {
				projectId = projectIds[index];
				project = getProject(projectId);
				if (project) {
					projectItems.push(project);
				}
			}
		}
	} else if (!dontLoad) {
		onTempProjectsUpdated(() => {
			const curProjects = get(projects);
			getUserProjectsFromId(filteredProjects, projectIds, true);
		});
	}

	filteredProjects.set(projectItems);
}

export function getFilteredProjects(projects, options) { // filteredProjects
	let searchString = (options && options.searchString) || null;
	let limit = (options && options.limit) || 0;

	const newFilteredProjects = [];

	let filteredCount = 0;
	let project, curProject;
	for (let index = 0; index < projects.length; index++) {
		project = projects[index];
		curProject = get(project);
		if (curProject && (!searchString || projectSearchMatch(curProject, searchString))) {
			newFilteredProjects.push(project);

			filteredCount++;
			if (limit && filteredCount >= limit) {
				break;
			}
		}
	}

	return newFilteredProjects;
	// filteredProjects.set(newFilteredProjects);
}

function projectSearchMatch(project, searchString) {
	searchString = searchString.toLowerCase();

	if (project.title && project.title.toLowerCase().includes(searchString)) return true;
	if (project.description && project.description.toLowerCase().includes(searchString)) return true;
	if (project.location && project.location.toLowerCase().includes(searchString)) return true;
	return false;
}

export function getMyProjects() {
	updateMyProjects();
	loadProjects();
	return myProjects;
}

export function getArchivedProjects() {
	updateArchivedProjects();
	loadProjects();
	return archivedProjects;
}

export function getFollowingProjects() {
	updateFollowingProjects();
	loadProjects();
	return followingProjects;
}

export function getDiscoveryProjects() { // options) {
	updateDiscoveryProjects(true);
	loadProjects();
	return discoveryProjects;
}

export function updateMyProjects() {
	let newProjects = get(projects);
	if (newProjects) {
		newProjects = newProjects.filter(projectModel => {
			const project = get(projectModel);
			return project.isOwner && !project.archived;
		});
		// console.log('updateMyProjects: ', newProjects);
		myProjects.set(newProjects);
	}
}
export function updateMyPublicProjects() {
	let newProjects = get(projects);
	if (newProjects) {
		newProjects = newProjects.filter(projectModel => {
			const project = get(projectModel);
			return project.isOwner && !project.archived && project.public;
		});
		// console.log('updateMyPublicProjects: ', newProjects);
		myPublicProjects.set(newProjects);
	}
}
export function updateArchivedProjects() {
	let newProjects = get(projects);
	if (newProjects) {
		newProjects = newProjects.filter(projectModel => {
			const project = get(projectModel);
			return project.isOwner && project.archived;
		});
		// console.log('updateArchivedProjects: ', newProjects);
		archivedProjects.set(newProjects);
	}
}
export function updateFollowingProjects() {
	let newProjects = get(projects);
	if (newProjects) {
		newProjects = newProjects.filter(projectModel => {
			const project = get(projectModel);
			return project.following && !project.isOwner && !project.archived && project.public;
		});
		// console.log('updateFollowingProjects: ', newProjects);
		followingProjects.set(newProjects);
	}
}
export function updateOtherProjects() {
	let newProjects = get(projects);
	if (newProjects) {
		newProjects = newProjects.filter(projectModel => {
			const project = get(projectModel);
			return !project.following && !project.isOwner && !project.archived && project.public;
		});
		// console.log('updateOtherProjects: ', newProjects);
		otherProjects.set(newProjects);
	}
}
export function updateDiscoveryProjects(updateDependencies) {
	if (updateDependencies) {
		updateMyPublicProjects();
		updateFollowingProjects();
		updateOtherProjects();
	}
	const sourceMyPublicProjects = get(myPublicProjects);
	if (sourceMyPublicProjects) {
		const sourceFollowingProjects = get(followingProjects);
		const sourceOtherProjects = get(otherProjects);
		if (sourceFollowingProjects && sourceOtherProjects) {
			let newProjects = [...sourceOtherProjects, ...sourceMyPublicProjects, ...sourceFollowingProjects];

			if (get(locationMode) === 'local') {
				const testArrayCycleOffset = Math.min(4, newProjects.length - 1);
				newProjects = newProjects.slice(testArrayCycleOffset, newProjects.length).concat(newProjects.slice(0, testArrayCycleOffset));
			}
			// console.log('updateDiscoveryProjects: ', newProjects);
			discoveryProjects.set(newProjects);
		}
	}
}

function projectsUpdated() {
	updateMyProjects();
	updateFollowingProjects();
	updateOtherProjects();
	updateMyPublicProjects();
	updateDiscoveryProjects();
	updateArchivedProjects();
}

export function addProject(projectDetails) {
    let projectId, trialIndex;
	do { projectId = generateId(); } while (getProject(projectId) && trialIndex < 99);
	if (trialIndex === 99) { return null; }

	// const newProjectModel = Object.assign({}, ProjectModel);

	const newProjectModel = ProjectModel();

	const curProjects = get(projects);
	curProjects.unshift(newProjectModel);

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

	projects.set(curProjects);

	// projects.unshift(newProjectModel);

	api.addProject({details: newProjectModel}).then(result => {
		newProjectModel._id = result.insertedId;
	});

	return newProjectModel;
}

export function updateProject(project, projectDetails) {
	// projectDetails._id = project._id;

	Object.assign(project, projectDetails);

	api.updateProject({id: project.id, details: projectDetails});
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