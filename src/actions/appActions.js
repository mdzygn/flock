import api from '../api';

import { goto } from '@sapper/app';
import { get } from 'svelte/store';
import { tick } from 'svelte';

import conversations from '../data/conversations.json';

import promptIds from '../config/promptIds';

// const { page } = stores();

import {
    getProject,
    loadProjects,
    onProjectsUpdated,
    updateProjectLists,
} from '../models/projectsModel';

import {
    getUser,
    onUsersUpdated,
    mergeUsers,
} from '../models/usersModel';

import {
    curPath,

    projectId,
    channelId,
    threadId,
    conversationId,
    profileId,

    user,
    userId,

    username,
    usercode,

    project,
    conversation,
    viewedUser,

    targetProject,
    targetUser,

    resetScrollRegionPosition,

    profileDisplayingAllProjects,

    projectReturnView,
    projectShowingInfo,
    editingProject,

    displayingAllMyProjects,
    displayingAllFollowingProjects,

    curMenu,
    curPrompt,
    getIsProjectTeamMember,
} from '../models/appModel';

export function loadProject(targetProjectId, options) {
    // console.log('loadProject', targetProjectId);

    loadProjects({ id: targetProjectId });

    projectId.set(targetProjectId);

    setProject(targetProjectId);

    if (gotoRoute('projects/' + targetProjectId)) {
        projectShowingInfo.set(options && options.showInfo);
    }
    resetScrollRegionPosition('project');
}

function setProject(targetProjectId) {
    const curProjectModel = getProject(targetProjectId);
    const curProject = get(curProjectModel);

    project.set(curProject);
    projectReturnView.set(curProject && (curProject.following || getIsProjectTeamMember(curProject))); // curProject.isOwner
}

onProjectsUpdated(() => {
    // if project object not found but project id set then update project model
    if (!get(project) && get(projectId)) {
        const targetProjectId = get(projectId);
        setProject(targetProjectId);
    }
});

function setViewedUser(targetProfileId) {
    const curUserModel = getUser(targetProfileId);
    const curUser = get(curUserModel);

    viewedUser.set(curUser);
}

export function setUser(targetUserId) {
    const curUserModel = getUser(targetUserId);
    const curUser = get(curUserModel);

    if (curUser) {
        userId.set(targetUserId);
        user.set(curUser);
        // console.log(get(user));
    }
}

onUsersUpdated(() => {
    // if project object not found but project id set then update project model
    if (!get(viewedUser) && get(profileId)) {
        const targetProfileId = get(profileId);
        setViewedUser(targetProfileId);
    }
    if (get(userId) && (!get(user) || get(user).id !== get(userId))) {
        setUser(get(userId));
    }
});

export function setNavSection(section) {
    // const sectionId = getIdForSection(section);
    // switch (sectionId) {

    switch (section.segment) {
        case 'projects':
            displayingAllMyProjects.set(false);
            displayingAllFollowingProjects.set(false);
            goto('projects');
            break;
        case undefined:
            goto('.');
            break;
        default:
            goto(section.segment);
    }
}

export function loadProjectPost(targetProjectId) {
    loadProject(targetProjectId + '#post');
}

export function newProject() {
    if (!checkLoggedIn()) { return; }

    goto('projects/new');
}
export function editProjectDetails(options) {
    if (!checkLoggedIn()) { return; }

    editingProject.set(options && options.editingProject);

    goto('projects/' + get(projectId) + '/details');
}

export function showLikes() {
    goto('profile/' + get(profileId) + '/likes');
    resetScrollRegionPosition('likes');
}

export function loadThread(targetThreadId) {
    threadId.set(targetThreadId);

    goto('threads/' + targetThreadId );
    resetScrollRegionPosition('thread');
}

export function loadChannel(targetChannelId) {
    channelId.set(targetChannelId);

    goto('channels/' + targetChannelId );
    resetScrollRegionPosition('channel');
}

export function loadProfile(targetProfileId, options) {
    // console.log('targetProfileId: ' + targetProfileId);

    profileId.set(targetProfileId);

    // const curUser = users.find(item => item.id === targetProfileId);
    const curUserModel = getUser(targetProfileId);
    const curUser = get(curUserModel);
    viewedUser.set(curUser);

    if (gotoRoute('profile/' + targetProfileId)) {
        profileDisplayingAllProjects.set(false);
    }
    resetScrollRegionPosition('profile');
}

export function loadConversation(targetConversationId) {
    if (!checkLoggedIn()) { return; }

    // console.log('loadConversation: ' + targetConversationId);

    conversationId.set(targetConversationId);

    const curConversation = conversations.find(item => item.id === targetConversationId);
    conversation.set(curConversation);

    gotoRoute('messages/' + targetConversationId);
    resetScrollRegionPosition('conversation');
}

export function messageUser(userId) {
    if (!checkLoggedIn()) { return; }

    loadConversation('r70dp2bf');
}

function gotoRoute(newPath) {
    // console.log(getPagePath()+ ' !== /' + newPath + ' : ' + (getPagePath() !== '/' + newPath));
    if (getPagePath() !== '/' + newPath && typeof window !== 'undefined') {
        goto(newPath);
        return true;
    }
    return false;
}

export function showProjectInfo() {
    projectShowingInfo.set(true);
}
export function hideProjectInfo() {
    projectShowingInfo.set(false);
}
export function toggleProjectInfo() {
    projectShowingInfo.set(!get(projectShowingInfo));
}

function getPagePath() {
    return get(curPath);
}

export function showProjectFollowers(targetProjectId) {
    gotoRoute('projects/' + targetProjectId + '/followers');
    resetScrollRegionPosition('followers');
}

export function showMenu(menuId) {
    hidePrompt();
    if (!menuId) { console.error('Menu undefined: ' + promptId); }
	curMenu.set(menuId);
}

export function showPrompt(promptId) {
    hideMenu();
    if (!promptId) { console.error('Prompt undefined: ' + promptId); }
	curPrompt.set(promptId);
}

export function closeOverlay() {
    hideMenu();
    hidePrompt();
}

function hideMenu() {
    if (get(curMenu)) {
        curMenu.set(null);
    }
}
function hidePrompt() {
    if (get(curPrompt)) {
        curPrompt.set(null);
    }
}

// export function copyPageLink() {
//     copyToClipboard(location.href);
// }

export function showShareProjectDialog(projectId) {
    const projectModel = getProject(projectId);
    const project = get(projectModel);

    targetProject.set(project);

    showPrompt(promptIds.SHARE_PROJECT);
}

export function showShareProfileDialog(userId) {
    const userModel = getUser(userId);
    const user = get(userModel);

    targetUser.set(user);

    showPrompt(promptIds.SHARE_PROFILE);
}

export function showTogglePublicDialog() {
    const curProject = get(project);
    if (curProject) {
        if (!curProject.public) {
            showPrompt(promptIds.MAKE_PUBLIC);
        } else {
            showPrompt(promptIds.MAKE_PRIVATE);
        }
    }
}

export function login(details) {
    api.login(details).then(result => {
        if (result && !result.invalid && !result.error) {
            const userInfo = result;
            if (userInfo.id) {
                mergeUsers([userInfo]);
                setUser(userInfo.id);

                username.set(userInfo.username);
                usercode.set(userInfo.usercode);

                updateProjectLists();
            }
        } else {
            showPrompt(promptIds.LOG_IN_ERROR);
        }
    });
}

export async function logOut(dontDisplayMessage) {
    const curUser = get(user);
    if (curUser && get(viewedUser) && curUser.id === get(viewedUser).id) {
        viewedUser.set(get(viewedUser));
    }
    userId.set(null);
    user.set(null);

    updateProjectLists();

    // if (!dontDisplayMessage) {
    //     await tick();
    //     showPrompt(promptIds.LOGGED_OUT);
    // }
}

export function checkLoggedIn() {
    if (!get(user)) {
        showPrompt(promptIds.SIGN_UP);

        return false;
    }
    return true;
}