import { get } from 'svelte/store';
import { goto } from '@sapper/app';
import { tick } from 'svelte';

import Config from '../config';

// import { DEBUG } from '../config';

import promptIds from '../config/promptIds';

import ProjectModel, {
    addProject,
    updateProject,
    getProject,
    setFollowProject,
    setLikeProject,
    addTeamMembers,
    removeTeamMembers,
    updateProjectTeam,
    checkUpdateProject,
} from '../models/projectsModel';

import {
    project,
    projectId,
    resetScrollRegionPosition,
    getIsProjectTeamMember,
} from '../models/appModel';

import {
    loadProject,
    editProjectDetails,
    showProjectInfo,
    showPrompt,
    closeOverlay,
    checkLoggedIn,
} from '../actions/appActions';

import {
    loadChannels,
} from '../models/channelsModel';

ProjectModel.on('projectAdded', loadProjectChannels);

function loadProjectChannels() {
    loadChannels( { projectId: get(projectId) } );
}

export function projectToggleFollowing(projectId) {
    if (!checkLoggedIn()) { return; }

    const targetProjectModel = getProject(projectId);
    const targetProject = get(targetProjectModel);
    if (targetProject) {
        setFollowProject(targetProject, targetProjectModel, !targetProject.following);
        // updateProject(targetProject, {
        //     following: !targetProject.following,
        //     followCount: targetProject.followCount + (!targetProject.following ? 1 : -1),
        // });

        // targetProjectModel.set(targetProject);
        // checkUpdateProject(targetProject);
    }
}

export function projectToggleLiked(projectId) {
    if (!checkLoggedIn()) { return; }

    const targetProjectModel = getProject(projectId);
    const targetProject = get(targetProjectModel);

    if (targetProject) {
        setLikeProject(targetProject, targetProjectModel, !targetProject.liked);
        // updateProject(targetProject, {
        //     liked: !targetProject.liked,
        //     likeCount: targetProject.likeCount + (!targetProject.liked ? 1 : -1),
        // });
        // checkUpdateProject(targetProject);
    }
}

export async function makePublic() {
    if (!checkLoggedIn()) { return; }

    const curProject = get(project);
    if (curProject) {
        updateProject(curProject, {
            public: true,
            isNew: false,
        });
        project.set(curProject);

        await tick();
        showPrompt(promptIds.MAKE_PUBLIC_COMPLETE);
    }
}

export async function makePrivate() {
    if (!checkLoggedIn()) { return; }

    const curProject = get(project);
    if (curProject) {
        updateProject(curProject, {
            public: false,
        });
        project.set(curProject);

        await tick();
        showPrompt(promptIds.MAKE_PRIVATE_COMPLETE);
    }
}

// export async function togglePublic() {
//     const curProject = get(project);
//     if (curProject) {
//         const details = {
//             public: !curProject.public,
//         }
//         if (details.public) {
//             details.isNew = false;
//         }
//         updateProject(curProject, details);
//         project.set(curProject);
//     }
// }

export function saveProjectDetails(projectDetails, options) {
    if (!checkLoggedIn()) { return; }

    const curProject = get(project);
    if (curProject) {
        updateProject(curProject, projectDetails);
        project.set(curProject);

        if (Config.ADD_DETAILS_AFTER_PROJECT_CREATE && options && options.editProjectDetails) {
            editProjectDetails({editingProjectMode: 'details3'});
        } else {
            goto('projects/' + curProject.id);
            if (options && options.showProjectInfo) {
                showProjectInfo();
            }
            resetScrollRegionPosition('project');
        }
    }
}

function getTeamMemberList(teamMemberList) {
    let teamMembers = teamMemberList.split(',');
    teamMembers = teamMembers.map((item) => item.trim());
    teamMembers = teamMembers.filter((item) => item.length);
    return teamMembers;
}

export function addProjectTeamMembers(teamMemberList) {
    if (!checkLoggedIn() || !teamMemberList) { return; }

    const teamMembers = getTeamMemberList(teamMemberList);

    showPrompt(promptIds.EDIT_TEAM_MEMBERS_PROCESSING);

    const curProject = get(project);
    const result = addTeamMembers(curProject, teamMembers);
    checkEditTeamResult(result, curProject);
}
export function removeProjectTeamMembers(teamMemberList) {
    if (!checkLoggedIn() || !teamMemberList) { return; }

    const teamMembers = getTeamMemberList(teamMemberList);

    showPrompt(promptIds.EDIT_TEAM_MEMBERS_PROCESSING);
    
    const curProject = get(project);
    const result = removeTeamMembers(curProject, teamMembers);
    checkEditTeamResult(result, curProject);
}

function checkEditTeamResult(result, curProject) {
    if (result) {
        result.then((result) => {
            closeOverlay();
            if (result) {
                if (!result.error && !result.invalid) {
                    // loadProject(curProject.id);
                    if (result.addedMembers && result.addedMembers.length) {
                        showPrompt(promptIds.EDIT_TEAM_MEMBERS_COMPLETE, {message: 'Team member'+((result.addedMembers.length > 1)?'s':'')+' added:<br/><strong>' + result.addedMembers.join(', ') + '</strong>'});
                    } else if (result.removedMembers && result.removedMembers.length) {
                        showPrompt(promptIds.EDIT_TEAM_MEMBERS_COMPLETE, {message: 'Team member'+((result.removedMembers.length > 1)?'s':'')+' removed:<br/><strong>' + result.removedMembers.join(', ') + '</strong>'});
                    }
                    if (result.projectId, result.team && result.team.length) {
                        updateProjectTeam(result.projectId, result.team);
                    }
                } else {
                    if (result.tryingToRemoveOwner) {
                        showPrompt(promptIds.EDIT_TEAM_MEMBERS_ERROR, {message: 'You cannot remove project creator from the team'});
                    } else if (result.tryingToRemoveSelf) {
                        showPrompt(promptIds.EDIT_TEAM_MEMBERS_ERROR, {message: 'You cannot remove yourself from the team'});
                    } else if (result.membersNotExisting &&  result.membersNotExisting.length) {
                        showPrompt(promptIds.EDIT_TEAM_MEMBERS_ERROR, {message: 'User'+((result.membersNotExisting.length > 1)?'s':'')+' not  found with username'+((result.membersNotExisting.length > 1)?'s':'')+':<br/><strong>' + result.membersNotExisting.join(', ') + '</strong>'});
                    } else if (result.membersAlreadyInGroup &&  result.membersAlreadyInGroup.length) {
                        showPrompt(promptIds.EDIT_TEAM_MEMBERS_ERROR, {message: 'User'+((result.membersAlreadyInGroup.length > 1)?'s':'')+' already in team:<br/><strong>' + result.membersAlreadyInGroup.join(', ') + '</strong>'});
                    } else if (result.membersNotInGroup &&  result.membersNotInGroup.length) {
                        showPrompt(promptIds.EDIT_TEAM_MEMBERS_ERROR, {message: 'User'+((result.membersNotInGroup.length > 1)?'s':'')+' not found in team:<br/><strong>' + result.membersNotInGroup.join(', ') + '</strong>'});
                    } else if (!result || result.error || result.invalid) {
                        showPrompt(promptIds.SERVER_ERROR);
                    }
                }
            } else if (!result || result.error || result.invalid) {
                showPrompt(promptIds.SERVER_ERROR);
            }
        });
    }
}

export function createProject(projectDetails) {
    if (!checkLoggedIn()) { return; }

    if (projectDetails.headerImage) {
        projectDetails.headerImage = projectDetails.headerImage;
        // projectDetails.headerImage = 'resource/headers/' + projectDetails.headerImage + '.jpg';
    }

    const newProjectModel = addProject(projectDetails);
    const newProject = get(newProjectModel);

    if (newProject) {
        loadProject(newProject.id);
        editProjectDetails({editingProjectMode: 'details2'});
    }
}

export function reportProject(projectId) {
    if (!checkLoggedIn()) { return; }

    const targetProjectModel = getProject(projectId);
    const targetProject = get(targetProjectModel);

    targetProject.reported = true;
    targetProjectModel.set(targetProject);
    checkUpdateProject(targetProject);

    // TODO: report project
}

export async function archiveProject(projectId) {
    if (!checkLoggedIn()) { return; }

    const targetProjectModel = getProject(projectId);
    const targetProject = get(targetProjectModel);

    if (getIsProjectTeamMember(targetProject)) { // targetProject.isOwner) {
        const details = { archived: true };

        // targetProject.archived = details.archived;
        // targetProjectModel.set(targetProject);
        // checkUpdateProject(targetProject);

        const result = updateProject(targetProject, details, true);

        // resetScrollRegionPosition('project');

        // await tick();
        // showPrompt(promptIds.PROJECT_ARCHIVED);

        result.then((result) => {
            if (result && !result.error && !result.invalid) {

                targetProject.archived = details.archived;
                targetProjectModel.set(targetProject);
                checkUpdateProject(targetProject);

                resetScrollRegionPosition('project');

                showPrompt(promptIds.PROJECT_ARCHIVED);
            } else {
                targetProject.archived = !details.archived;
                targetProjectModel.set(targetProject);
                checkUpdateProject(targetProject);

                triggerShowPrompt(promptIds.SERVER_ERROR);
            }
        });
    }
}

export async function unarchiveProject(projectId) {
    if (!checkLoggedIn()) { return; }

    const targetProjectModel = getProject(projectId);
    const targetProject = get(targetProjectModel);

    if (getIsProjectTeamMember(targetProject)) { // targetProject.isOwner) {
        const details = { archived: false };

        // targetProject.archived = details.archived;
        // targetProjectModel.set(targetProject);
        // checkUpdateProject(targetProject);

        const result = updateProject(targetProject, details, true);

        // await tick();
        // showPrompt(promptIds.PROJECT_UNARCHIVED);

        result.then((result) => {
            if (result && !result.error && !result.invalid) {
                targetProject.archived = details.archived;
                targetProjectModel.set(targetProject);
                checkUpdateProject(targetProject);
                
                showPrompt(promptIds.PROJECT_UNARCHIVED);
            } else {
                targetProject.archived = !details.archived;
                targetProjectModel.set(targetProject);
                checkUpdateProject(targetProject);

                triggerShowPrompt(promptIds.SERVER_ERROR);
            }
        });
    }
}