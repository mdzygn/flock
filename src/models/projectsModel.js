import api from '../api';

import EventEmitter from 'eventemitter3';
// const EventEmitter = require('events');

import { writable, get } from 'svelte/store';

import { getSearchString, removeCommonWordSuffixes } from '../utils/searchUtils';
import { generateId } from '../utils';

import loadingRequestUtil from '../utils/loadingRequestUtil';

import {
    showBetaFeatures,
} from '../models/appModel';

import promptIds from '../config/promptIds';

import config from '../config';

import {
	locationMode,
	getIsProjectTeamMember,
	user,
	userId,
	projectId,
	project,
	getHeaderImage,
	showProjectCounts,
	triggerShowPrompt,
	triggerGotoRoute,
} from '../models/appModel';

import ProjectModel from '../models/projectModel';

// import projectsData from '../data/projects.json';
// const projects = JSON.parse(JSON.stringify(projectsData));

const ProjectsModel = new EventEmitter();
export default ProjectsModel;

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
	if (!loadingRequestUtil.isLoading('projects', options)) {
		loadingRequestUtil.setLoading('projects', options, () => { loadingProjects.set(true); });
	// if (!get(loadingProjects)) {
	// 	loadingProjects.set(true);
		if (get(showProjectCounts)) {
			if (!options) options = {};
			options.getCounts = true;
		}
		api.getProjects(options).then(result => {
			mergeProjects(result);
			// loadingProjects.set(false);
			loadingRequestUtil.clearLoading('projects', options, () => { loadingProjects.set(false); });
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
	if (newProjects && newProjects.length) {
		const curProjects = get(projects);
		const currentProjectId = get(projectId);

		let curProject, newProjectData, curProjectId, newProject;
		for (var projectI = 0; projectI < newProjects.length; projectI++) {
			newProjectData = newProjects[projectI];
			curProjectId = newProjectData.id;
			curProject = curProjects.find(match => get(match).id === curProjectId);
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
			if (currentProjectId && curProjectId === currentProjectId) {
				project.set(newProject);
			}
		}
		// console.log('update projects: ', curProjects);

		projects.set(curProjects);
	}
}

export function getProject(projectId) {
	return get(projects).find(item => get(item).id === projectId);
}

export function getUserProjectsFromId(filteredProjects, projectIds, dontLoad, options) {
	loadProjects();

	let projectItems = [];

	const showArchived = !!(options && options.filterArchived);
	const showPrivate = !!(options && options.filterPrivate);

	const curProjects = get(projects);
	if (curProjects && curProjects.length) {
		if (projectIds) {
			projectItems = [];

			let projectModel, project, projectId;
			for (let index = 0; index < projectIds.length; index++) {
				projectId = projectIds[index];
				projectModel = getProject(projectId);
				project = get(projectModel);
				if (project) {
					if ((!project.archived || showArchived) && (project.public || showPrivate)) {
						projectItems.push(projectModel);
					}
				}
			}
		}
	} else if (!dontLoad) {
		onTempProjectsUpdated(() => {
			// const curProjects = get(projects);
			getUserProjectsFromId(filteredProjects, projectIds, true);
		});
	}

	projectItems.sort((a,b) => get(b).lastActiveAt - get(a).lastActiveAt);

	filteredProjects.set(projectItems);
}

export function getFilteredProjects(projects, options) { // filteredProjects
	let searchString = (options && options.searchString) || null;
	if (searchString) {
		searchString = searchString.toLowerCase();
		searchString = getSearchString(searchString);
	}

	let filterString = (options && options.filterString) || null;
	if (filterString) {
		filterString = filterString.toLowerCase();
		if (filterString.indexOf('s') === filterString.length - 1) {
			filterString = filterString.substring(0, filterString.length - 1);
		}
	}

	let limit = (options && options.limit) || 0;

	const newFilteredProjects = [];

	let filteredCount = 0;
	let project, curProject;
	let projectI = 0;
	for (projectI = 0; projectI < projects.length; projectI++) {
		project = projects[projectI];
		curProject = get(project);
		if (curProject && ((!searchString && !filterString) || projectSearchMatch(curProject, searchString, filterString))) {
			newFilteredProjects.push(project);

			filteredCount++;
			if (limit && filteredCount >= limit) {
				break;
			}
		}
	}

	let desuffixedSearchString = removeCommonWordSuffixes(searchString);
	for (let projectI = 0; projectI < projects.length; projectI++) {
		project = projects[projectI];
		curProject = get(project);
		if (curProject && ((!searchString && !filterString) || projectSearchMatch(curProject, desuffixedSearchString, filterString))) {
			if (newFilteredProjects.indexOf(project) === -1) {
				newFilteredProjects.push(project);

				filteredCount++;
				if (limit && filteredCount >= limit) {
					break;
				}
			}
		}
	}

	return newFilteredProjects;
	// filteredProjects.set(newFilteredProjects);
}

function projectSearchMatch(project, searchString, filterString) {
	let filterMatched = true;
	if (filterString) {
		filterMatched = false;
		if (project.title && project.title.toLowerCase().includes(filterString)) filterMatched = true;
		if (project.description && project.description.toLowerCase().includes(filterString)) filterMatched = true;
		if (project.categories && project.categories.toLowerCase().includes(filterString)) filterMatched = true;
		if (project.tags && project.tags.toLowerCase().includes(filterString)) filterMatched = true;
	}
	if (filterMatched) {
		if (searchString) {
			if (project.title && project.title.toLowerCase().includes(searchString)) return true;
			if (project.description && project.description.toLowerCase().includes(searchString)) return true;
			if (project.categories && project.categories.toLowerCase().includes(searchString)) return true;
			if (project.tags && project.tags.toLowerCase().includes(searchString)) return true;
			if (project.skills && typeof project.skills === 'string' && project.skills.toLowerCase().includes(searchString)) return true;  // TODO: remove convertion once all converted
			// if (project.skills && (project.skills.toLowerCase ? project.skills.toLowerCase().includes(searchString) : project.skills.includes(searchString))) return true;
			if (project.location && project.location.toLowerCase().includes(searchString)) return true;
			if (project.projectType && project.projectType.toLowerCase().includes(searchString)) return true;
			// if (project.status && project.status.toLowerCase().includes(searchString)) return true;
		} else {
			return true;
		}
	} else {
		return false;
	}
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
			// return !project.following && !project.archived && project.public; // include team projects for now
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
		updateFollowingProjects();
		updateOtherPublicProjects();
		updateMyPublicProjects();
	}
	let sourceMyPublicProjects = get(myPublicProjects); // included my projects in other public projects for now
	// if (sourceMyPublicProjects) {
		let sourceOtherPublicProjects = get(otherPublicProjects);
		let sourceFollowingProjects = get(followingProjects);
		if (sourceFollowingProjects && sourceOtherPublicProjects && sourceMyPublicProjects) {
			// if (get(locationMode) !== 'local') {
			// 	sourceOtherPublicProjects = [...sourceOtherPublicProjects].reverse();
			// 	sourceMyPublicProjects = [...sourceMyPublicProjects].reverse();
			// 	sourceFollowingProjects = [...sourceFollowingProjects].reverse();
			// }

			// let newProjects = [...sourceOtherPublicProjects, ...sourceFollowingProjects];
			let newProjects = [...sourceOtherPublicProjects, ...sourceFollowingProjects, ...sourceMyPublicProjects];
			// let newProjects = [...sourceOtherPublicProjects, ...sourceMyPublicProjects, ...sourceFollowingProjects];

			if (!get(showBetaFeatures)) { // if showing home intro and flock project within first 4 projects then move flock project further down list or remove
				const flockProject = newProjects.find(match => get(match).id === config.FLOCK_PROJECT);
				if (flockProject) {
					const flockProjectIndex = newProjects.indexOf(flockProject);
					if (flockProjectIndex < config.MAX_FLOCK_PROJECT_INDEX) {
						newProjects.splice(flockProjectIndex, 1);

						if (newProjects.length > config.MAX_FLOCK_PROJECT_INDEX) { // if more than 4 projects then add at the fourth position
							newProjects.splice(config.MAX_FLOCK_PROJECT_INDEX, 0, flockProject);
						}
					}
				}
			}

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
	// }
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

export function getNewProjectId() {
    let projectId, trialIndex;
	do { projectId = generateId(); } while (getProject(projectId) && trialIndex < 99);
	if (trialIndex === 99) { return null; }
	return projectId;
}

export function addProject(projectDetails) {
    // let projectId, trialIndex;
	// do { projectId = generateId(); } while (getProject(projectId) && trialIndex < 99);
	// if (trialIndex === 99) { return null; }

	const newProjectModel = ProjectModel();
	const newProject = get(newProjectModel);

	const ownerId = get(userId);

	// newProject.id = projectId;
	newProject.id = projectDetails.id;

	newProject.ownerId = ownerId;
	newProject.team = [ownerId];

	newProject.headerImage = projectDetails.headerImage || null;
	newProject.title = projectDetails.title || '';
	newProject.description = projectDetails.description || '';

	newProject.createdAt = (new Date()).getTime(); // use for initial sort values
	newProject.modifiedAt = newProject.createdAt;
	newProject.lastActiveAt = newProject.createdAt;

	newProject.isNew = true;
	newProject.hasCreated = true;

	newProject.followCount = 0;
	newProject.likeCount = 0;

	// newProject.followCount++;
	// newProject.likeCount++;

	// not to send
	// newProject.liked = true;
	// newProject.following = true;

	api.addProject({details: newProject}).then(result => {
		if (!result || result.error || result.invalid) {
			removeProjectModel(newProjectModel);

			triggerGotoRoute('projects');
            setTimeout(() => { // TODO: cleaner
				triggerShowPrompt(promptIds.ADD_PROJECT_ERROR);
            }, 100);
		} else {
			ProjectsModel.emit('projectAdded');
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

export function updateProject(project, projectDetails, nonModification) {
	const isModification = !nonModification;

	api.updateProject({id: project.id, details: projectDetails, isModification}).then(result => {
		if (!result || result.error || result.invalid) {
			triggerShowPrompt(promptIds.SERVER_ERROR);
		}
	});

	Object.assign(project, projectDetails);

	project.lastActiveAt = (new Date()).getTime();
	if (isModification) {
		project.modifiedAt = project.lastActiveAt;
	}
}

export function addTeamMembers(project, teamMemberUsernames) {
	return api.updateTeamMembers({id: project.id, addTeamMemberUsernames: teamMemberUsernames});
}

export function removeTeamMembers(project, teamMemberUsernames) {
	return api.updateTeamMembers({id: project.id, removeTeamMemberUsernames: teamMemberUsernames});
}

export function updateProjectTeam(projectId, newTeam) {
	const projectModel = getProject(projectId);
	const targetProject = get(projectModel);
	if (targetProject) {
		targetProject.team = newTeam;
		const curProject = get(project);
		if (curProject === targetProject) {
			project.set(curProject);
		}
	}
}

export function setLikeProject(targetProject, targetProjectModel, like, updateLocalOnly) {
	if (!updateLocalOnly) {
		if (like) {
			api.likeProject({userId: get(userId), projectId: targetProject.id}).then(result => {
				if (!result || result.error || result.invalid) {
					setLikeProject(targetProject, targetProjectModel, !like, true);
					checkUpdateProject(targetProject);
				}
			});
		} else {
			api.unlikeProject({userId: get(userId), projectId: targetProject.id}).then(result => {
				if (!result || result.error || result.invalid) {
					setLikeProject(targetProject, targetProjectModel, !like, true);
					checkUpdateProject(targetProject);
				}
			});
		}
	}

	targetProject.liked = like;
	targetProject.likeCount = targetProject.likeCount + (like ? 1 : -1);

	targetProjectModel.set(targetProject);

	const curUserDetails = get(user);
	if (curUserDetails) {
		curUserDetails.likesCount = curUserDetails.likesCount + (like ? 1 : -1);
		user.set(curUserDetails);
	}

	checkUpdateProject(targetProject);
}

export function checkUpdateProject(targetProject) {
    const curProject = get(project);
    if (curProject && curProject.id === targetProject.id) {
        project.set(targetProject);
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

export function getProjectHeaderImage(project, thumb) {
	if (project) {
		if (project.headerImage) {
			return getHeaderImage(project.headerImage, thumb);
			// return config.contentFolder + project.headerImage;
			// return config.SITE_CONTENT_URL + (fullImage ? config.headerImageLibraryFolder : config.headerImageLibraryThumbFolder) + project.headerImage + config.headerImageExtension;
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
		(projectDetails[3] && projectDetails[3].detail) ||
		(projectDetails[4] && projectDetails[4].detail)
	)) {
		return true;
	}
	return false;
}