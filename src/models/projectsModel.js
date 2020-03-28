import api from '../api';

import { writable, get } from 'svelte/store';

import { generateId } from '../utils/utils';

import config from '../config';

import { locationMode } from '../models/appModel';

import ProjectModel from '../models/projectModel';

const projectModels = {};

// import projectsData from '../data/projects.json';
// const projects = JSON.parse(JSON.stringify(projectsData));

export let loadingProjects = writable(false);

let projectsUpdatedHandlers = [];

let projects = writable([]);
let myProjects = writable([]);
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

projects.subscribe(() => {
	projectsUpdatedHandlers.forEach(handler => {
		handler();
	});
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

export function getProjectModel(projectId) {
	let projectModel = projectModels[projectId];
	if (!projectModel) {
		let sourceProjectModel = get(projects).find(item => get(item).id === projectId);
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
	updateMyProjects();
	loadProjects();
	return myProjects;
	// return get(projects).filter(project => project.isOwner);
}

export function getFollowingProjects() {
	updateFollowingProjects();
	loadProjects();
	return followingProjects;
	// return get(projects).filter(project => project.following && !project.isOwner);
}

// export function getOtherProjects() {
// 	loadProjects();
// 	return otherProjects;
// 	// return get(projects).filter(project => !project.following && !project.isOwner);
// }

export function getDiscoveryProjects() { // options) {
	updateDiscoveryProjects();
	loadProjects();
	return discoveryProjects;
	// return projects;

	// const otherProjects = getOtherProjects();
	// const ownedProjects = getMyProjects();
	// const followingProjects = getFollowingProjects();

	// let projects = [...otherProjects, ...ownedProjects, ...followingProjects];

	// if (options && options.location === 'local') {
	// 	const testArrayCycleOffset = Math.min(4, projects.length - 1);
	// 	projects = projects.slice(testArrayCycleOffset, projects.length).concat(projects.slice(0, testArrayCycleOffset));
	// }

	// return projects;
}

export function updateMyProjects() {
	let newProjects = get(projects);
	if (newProjects) {
		newProjects = newProjects.filter(projectModel => {
			const project = get(projectModel);
			return project.isOwner;
		});
		// console.log('updateMyProjects: ', newProjects);
		myProjects.set(newProjects);
	}
}
export function updateFollowingProjects() {
	let newProjects = get(projects);
	if (newProjects) {
		newProjects = newProjects.filter(projectModel => {
			const project = get(projectModel);
			return project.following && !project.isOwner;
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
			return !project.following && !project.isOwner;
		});
		// console.log('updateOtherProjects: ', newProjects);
		otherProjects.set(newProjects);
	}
}
export function updateDiscoveryProjects() {
	const sourceMyProjects = get(myProjects);
	if (sourceMyProjects) {
		const sourceFollowingProjects = get(followingProjects);
		const sourceOtherProjects = get(otherProjects);
		if (sourceFollowingProjects && sourceOtherProjects) {
			let newProjects = [...sourceOtherProjects, ...sourceMyProjects, ...sourceFollowingProjects];

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
	updateDiscoveryProjects();
}

// export function getMyProjectIds() {
// 	return getMyProjects().map(project => project.id);
// }

// export function getFollowingProjectIds() {
// 	return getFollowingProjects().map(project => project.id);
// }

// export function getDiscoveryProjectIds(options) {
// 	return getDiscoveryProjects(options).map(project => project.id);
// }

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

	api.addProject({project: newProjectModel}).then(result => {
		newProjectModel._id = result.insertedId;
	});

	return newProjectModel;
}

export function updateProject(project, projectDetails) {
	projectDetails._id = project._id;

	Object.assign(project, projectDetails);

	api.updateProject({details: projectDetails});
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