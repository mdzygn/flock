import api from '../api';

import { writable, get } from 'svelte/store';

import { generateId } from '../utils';

// import promptIds from '../config/promptIds';

import config from '../config';

import { locationMode, getIsProjectTeamMember, user, userId, project } from '../models/appModel';

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
let otherPublicProjects = writable([]);
let discoveryProjects = writable([]);

locationMode.subscribe(() => {
	updateDiscoveryProjects(true);
});

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
	if (searchString) {
		searchString = searchString.toLowerCase();
	}

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
	if (project.title && project.title.toLowerCase().includes(searchString)) return true;
	if (project.description && project.description.toLowerCase().includes(searchString)) return true;
	if (project.location && project.location.toLowerCase().includes(searchString)) return true;
	if (project.tags && project.tags.toLowerCase().includes(searchString)) return true;
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
			return getIsProjectTeamMember(project) && !project.archived;
		});
		newProjects.sort((a,b) => get(b).lastActiveAt - get(a).lastActiveAt); // sort by reversed updated time

		// console.log('updateMyProjects: ', newProjects);
		myProjects.set(newProjects);
	}
}
export function updateMyPublicProjects() {
	let newProjects = get(projects);
	if (newProjects) {
		newProjects = newProjects.filter(projectModel => {
			const project = get(projectModel);
			return getIsProjectTeamMember(project) && !project.archived && project.public;
		});
		newProjects.sort((a,b) => get(b).lastActiveAt - get(a).lastActiveAt); // sort by reversed updated time
		// console.log('updateMyPublicProjects: ', newProjects);
		myPublicProjects.set(newProjects);
	}
}
export function updateFollowingProjects() {
	let newProjects = get(projects);
	if (newProjects) {
		newProjects = newProjects.filter(projectModel => {
			const project = get(projectModel);
			return project.following && !getIsProjectTeamMember(project) && !project.archived && project.public;
		});
		newProjects.sort((a,b) => get(b).followTime - get(a).followTime); // sort by reversed follow time

		// console.log('updateFollowingProjects: ', newProjects);
		followingProjects.set(newProjects);
	}
}
export function updateOtherPublicProjects() {
	let newProjects = get(projects);
	if (newProjects) {
		newProjects = newProjects.filter(projectModel => {
			const project = get(projectModel);
			return !project.following && !getIsProjectTeamMember(project) && !project.archived && project.public;
		});
		newProjects.sort((a,b) => get(b).lastActiveAt - get(a).lastActiveAt); // sort by reversed updated time
		// console.log('updateOtherPublicProjects: ', newProjects);
		otherPublicProjects.set(newProjects);
	}
}
export function updateArchivedProjects() {
	let newProjects = get(projects);
	if (newProjects) {
		newProjects = newProjects.filter(projectModel => {
			const project = get(projectModel);
			return getIsProjectTeamMember(project) && project.archived;
		});
		newProjects.sort((a,b) => get(b).lastActiveAt - get(a).lastActiveAt); // sort by reversed updated time
		// console.log('updateArchivedProjects: ', newProjects);
		archivedProjects.set(newProjects);
	}
}

export function updateDiscoveryProjects(updateDependencies) {
	if (updateDependencies) {
		updateMyPublicProjects();
		updateFollowingProjects();
		updateOtherPublicProjects();
	}
	let sourceMyPublicProjects = get(myPublicProjects);
	if (sourceMyPublicProjects) {
		let sourceFollowingProjects = get(followingProjects);
		let sourceOtherPublicProjects = get(otherPublicProjects);
		if (sourceFollowingProjects && sourceOtherPublicProjects) {
			if (get(locationMode) !== 'local') {
				sourceOtherPublicProjects = [...sourceOtherPublicProjects].reverse();
				sourceMyPublicProjects = [...sourceMyPublicProjects].reverse();
				sourceFollowingProjects = [...sourceFollowingProjects].reverse();
			}

			let newProjects = [...sourceOtherPublicProjects, ...sourceMyPublicProjects, ...sourceFollowingProjects];

			// if (get(locationMode) === 'local') {
			// 	const testArrayCycleOffset = Math.min(4, newProjects.length - 1);
			// 	newProjects = newProjects.slice(testArrayCycleOffset, newProjects.length).concat(newProjects.slice(0, testArrayCycleOffset));
			// }

			// if (get(locationMode) === 'local') {
			// 	newProjects = newProjects.reverse();
			// }

			discoveryProjects.set(newProjects);
			// console.log('updateDiscoveryProjects: ', newProjects);
		}
	}
}

function clearProjectStates() {
	const curProjects = get(projects);
	let project, projectModel;
	for (var projectI = 0; projectI < curProjects.length; projectI++) {
		projectModel = curProjects[projectI];
		project = get(projectModel);
		if (project) {
			delete project.liked;
			delete project.following;
			delete project.followTime;
			projectModel.set(project);
		}
	}
	projects.set(curProjects);
}

export function updateProjectLists() {
	// TODO not to update all of these, only if on current view
	clearProjectStates();
	loadProjects();
	updateMyProjects();
	// getDiscoveryProjects();
	// getMyProjects();
	// getFollowingProjects();
	// getArchivedProjects();
}

function projectsUpdated() {
	// TODO not to update all of these, only if on current view
	updateMyProjects();
	updateFollowingProjects();
	updateOtherPublicProjects();
	updateMyPublicProjects();
	updateDiscoveryProjects();
	updateArchivedProjects();
}

export function addProject(projectDetails) {
    let projectId, trialIndex;
	do { projectId = generateId(); } while (getProject(projectId) && trialIndex < 99);
	if (trialIndex === 99) { return null; }

	const newProjectModel = ProjectModel();
	const newProject = get(newProjectModel);

	const ownerId = get(userId);

	newProject.id = projectId;

	newProject.headerImage = projectDetails.headerImage || null;
	newProject.title = projectDetails.title || '';
	newProject.description = projectDetails.description || '';

	newProject.createdAt = (new Date()).getTime(); // use for initial sort values
	newProject.modifiedAt = newProject.createdAt;
	newProject.lastActiveAt = newProject.createdAt;

	newProject.ownerId = ownerId;
	newProject.team = [ownerId];

	newProject.isNew = true;
	newProject.hasCreated = true;

	newProject.followCount++;
	newProject.likeCount++;

	// not to send
	// newProject.liked = true;
	// newProject.following = true;

	api.addProject({details: newProject}).then(result => {
		if (!result || result.error || result.invalid) {
			// showPrompt(promptIds.ADD_PROJECT_ERROR);
			removeProjectModel(newProjectModel);
		}
		// newProject._id = result.insertedId;
	});

	const curProjects = get(projects);
	curProjects.unshift(newProjectModel);
	projects.set(curProjects);

	return newProjectModel;
}

function removeProjectModel(projectModel) {
	if (projectModel && get(projectModel)) {
		const curProjects = get(projects);
		const projectIndex = curProjects.indexOf(projectModel);

		curProjects.splice(projectIndex, 1);
		projects.set(curProjects);

		if (get(project) && get(project).id === get(projectModel).id) {
			project.set(null);
		}
		projectModel.set(null);
	}
}

export function updateProject(project, projectDetails, nonModification, isSuperficial) {
	const isModification = !nonModification;

	api.updateProject({id: project.id, details: projectDetails, isModification, isSuperficial});

	Object.assign(project, projectDetails);

	if (!isSuperficial) {
		project.lastActiveAt = (new Date()).getTime();
		if (isModification) {
			project.modifiedAt = project.lastActiveAt;
		}
	}
}


export function setLikeProject(targetProject, like) {
	if (like) {
		api.likeProject({userId: get(userId), projectId: targetProject.id});
	} else {
		api.unlikeProject({userId: get(userId), projectId: targetProject.id});
	}

	targetProject.liked = like;
	targetProject.likeCount = targetProject.likeCount + (like ? 1 : -1);

	const curUserDetails = get(user);
	if (curUserDetails) {
		curUserDetails.likesCount = curUserDetails.likesCount + (like ? 1 : -1);
		user.set(curUserDetails);
	}
}

export function setFollowProject(targetProject, follow) {
	if (follow) {
		api.followProject({userId: get(userId), projectId: targetProject.id});
	} else {
		api.unfollowProject({userId: get(userId), projectId: targetProject.id});
	}

	targetProject.following = follow;
	targetProject.followCount = targetProject.followCount + (follow ? 1 : -1);
	targetProject.followTime = (new Date()).getTime();

	const curUserDetails = get(user);
	if (curUserDetails) {
		curUserDetails.followsCount = curUserDetails.followsCount + (follow ? 1 : -1);
		user.set(curUserDetails);
	}
}

export function getProjectHeaderImage(project, fullImage) {
	if (project) {
		if (project.headerImage) {
			// return config.contentFolder + project.headerImage;
			return (fullImage ? config.headerImageLibraryFolder : config.headerImageLibraryThumbFolder) + project.headerImage + config.headerImageExtension;
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