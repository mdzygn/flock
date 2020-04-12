import api from '../api';

import { goto } from '@sapper/app';
import { get } from 'svelte/store';
// import { tick } from 'svelte';

import conversations from '../data/conversations.json';

import promptIds from '../config/promptIds';

// const { page } = stores();

import {
    getProject,
    loadProjects,
    onProjectsUpdated,
    updateProjectLists,
    loadingProjects,
} from '../models/projectsModel';

import {
    getUser,
    onUsersUpdated,
    mergeUsers,
    loadUsers,
    loadingUsers,
} from '../models/usersModel';

import {
    getChannel,
    loadChannels,
    onChannelsUpdated,
    loadingChannels,
} from '../models/channelsModel';

import {
    getPost,
    loadPosts,
    onPostsUpdated,
    loadingPosts,
} from '../models/postsModel';

import {
    curPath,
    lastPreProjectPath,

    projectId,
    channelId,
    postId,
    conversationId,
    profileId,

    user,
    userId,

    username,
    usercode,

    project,
    conversation,
    viewedUser,

    channel,
    post,

    postType,

    targetProject,
    targetUser,

    resetScrollRegionPosition,

    postsAnchorToBottom,

    profileDisplayingAllProjects,

    projectReturnView,
    projectShowingInfo,
    editingProject,

    displayingAllMyProjects,
    displayingAllFollowingProjects,

    curMenu,
    curPrompt,
    getIsProjectTeamMember,

    dontAllowOverlayClose,
} from '../models/appModel';
import { tick } from 'svelte';

export function loadProject(targetProjectId, options) {
    // console.log('loadProject', targetProjectId);

    const path = get(curPath);
    if (!/\/projects\/.+/.test(path)) {
        lastPreProjectPath.set(path);
    }

    loadProjectItem(targetProjectId);
    // loadProjects({ id: targetProjectId });

    // projectId.set(targetProjectId);
    // setProject(targetProjectId);

    if (gotoRoute('projects/' + targetProjectId)) {
        projectShowingInfo.set(options && options.showInfo);
    }
    resetScrollRegionPosition('project');
}

export function loadProjectItem(targetProjectId) {
    loadProjects({ id: targetProjectId });

    projectId.set(targetProjectId);
    setProject(targetProjectId);
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
onChannelsUpdated(() => {
    // if channel object not found but channel id set then update channel model
    if (!get(channel) && get(channelId)) {
        const targetChannelId = get(channelId);
        setChannel(targetChannelId);
    }
});
onPostsUpdated(() => {
    // if channel object not found but channel id set then update channel model
    if (!get(post) && get(postId)) {
        const targetPostId = get(postId);
        setPost(targetPostId);
    }
});

function setViewedUser(targetProfileId) {
    const curUserModel = getUser(targetProfileId);
    const curUser = get(curUserModel);

    loadUsers({ id: targetProfileId });
    viewedUser.set(curUser);
}

export function setUser(targetUserId) {
    const curUserModel = getUser(targetUserId);
    const curUser = get(curUserModel);

    // loadUsers( { id: targetUserId } );

    if (curUser) {
        userId.set(targetUserId);
        user.set(curUser);
        // console.log(get(user));

        if (curUser && curUser.loaded && (!curUser.username || curUser.set === false)) {
            (async() => {
                await tick();
                showPrompt(promptIds.SET_ACCOUNT);
            })();
        }
    }
}

onUsersUpdated(() => {
    // if project object not found but project id set then update project model
    if (get(profileId) && (!get(viewedUser) || !get(viewedUser).loaded)) {
        const targetProfileId = get(profileId);
        setViewedUser(targetProfileId);
    }
    // if (get(userId) && (!get(user) || !get(user).loaded || get(user).id !== get(userId))) { // is already loaded, but still need to set user object
    if (get(userId)) { // force user object to update - to improve?
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

export function editProfile() {
    if (!checkLoggedIn()) { return; }

    goto('profile/' + get(profileId) + '/edit');
}

export function showLikes() {
    goto('profile/' + get(profileId) + '/likes');
    resetScrollRegionPosition('likes');
}

export function loadChannel(targetChannelId) {
    loadChannelItem(targetChannelId);

    gotoRoute('channels/' + targetChannelId );
    resetScrollRegionPosition('channel');
}
export function loadChannelItem(targetChannelId) {
    loadChannels( { id: targetChannelId } );

    channelId.set(targetChannelId);
    setChannel(targetChannelId);
}

function setChannel(targetChannelId) {
    const curChannelModel = getChannel(targetChannelId);
    const curChannel = get(curChannelModel);

    channel.set(curChannel);

    if (curChannel) {
        // console.log('projectId', get(projectId), curChannel && curChannel.projectId);
        if ((!get(projectId) || !get(project)) && curChannel.projectId) {
            loadProjectItem(curChannel.projectId);
            // setProject(curChannel.projectId);
        }
    }
}

export function loadPost(targetPostId, options) {
    loadPosts({ id: targetPostId });

    postId.set(targetPostId);
    setPost(targetPostId);

    postsAnchorToBottom.set(options && options.anchorToBottom);

    gotoRoute('posts/' + targetPostId );
    resetScrollRegionPosition('thread');
}

function setPost(targetPostId) {
    const curPostModel = getPost(targetPostId);
    const curPost = get(curPostModel);

    post.set(curPost);

    if (curPost) {
        if ((!get(channelId) || !get(channel)) && curPost.channelId) {
            loadChannelItem(curPost.channelId);
        }
        if ((!get(projectId) || !get(project)) && curPost.projectId) {
            loadProjectItem(curPost.projectId);
        }
    }
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
    if (getPagePath() !== '/' + newPath && typeof window !== 'undefined') { //  && !/\/projects\/.*\/details/.test(get(curPath)) //  && !/\/channels\/.*\/post/.test(get(curPath))
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

export function showMenu(menuId, options) {
    if (get(curMenu) !== menuId) {
        dontAllowOverlayClose.set(options && options.allowClose === false);

        hidePrompt();
        if (!menuId) { console.error('Menu undefined: ' + promptId); }
        curMenu.set(menuId);
    }
}

export function showPrompt(promptId, options) {
    if (get(curPrompt) !== promptId) {
        dontAllowOverlayClose.set(options && options.allowClose === false);

        hideMenu();
        if (!promptId) { console.error('Prompt undefined: ' + promptId); }
        curPrompt.set(promptId);
    }
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
    username.set(details.username);

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

    usercode.set('');

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

export function loadCurrentUser() {
    if (get(userId) && !get(user) && !get(loadingUsers)) {
        loadUsers( { id: get(userId) } );
    }
}
export function loadCurrentProject() {
    if (get(projectId) && !get(project) && !get(loadingProjects)) {
        loadProjects( { id: get(projectId) } );
    }
}

export function loadCurrentChannel() {
    if (get(channelId) && !get(channel) && !get(loadingChannels)) {
        loadChannels( { id: get(channelId) } );
        // if (get(projectId)) {
        //     // console.log('loadCurrentChannel projectId', get(projectId));
        //     loadChannels( { projectId: get(projectId) } );
        // } else {
        //     // console.log('loadCurrentChannel channelId', get(channelId));
        //     loadChannels( { id: get(channelId) } );
        // }
    }
}

export function loadCurrentPost() {
    if (get(postId) && !get(post) && !get(loadingPosts)) {
        loadPosts( { id: get(postId) } );
    }
}

export function newThread() {
    postType.set('thread');

    goto('posts/new');
}

export function newThreadPost() {
    postType.set('threadPost');

    goto('posts/new');
}