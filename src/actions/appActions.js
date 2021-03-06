import api from '../api';

import { DEBUG } from '../config';

import { goto } from '@sapper/app';
import { get } from 'svelte/store';
import { tick } from 'svelte';

import { trim, copyToClipboard } from '../utils';

// import conversations from '../data/conversations.json';

import promptIds from '../config/promptIds';

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
    // deletePostFromChannel,
} from '../models/channelsModel';

import {
    getPost,
    loadPosts,
    onPostsUpdated,
    loadingPosts,
} from '../models/postsModel';

import ConversationsModel, {
    getConversation,
    loadConversations,
    onConversationsUpdated,
    loadingConversations,
    getConversationUsersId,
    mergeConversations,
} from '../models/conversationsModel';

import AppModel, {
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

    loggingIn,

    postType,

    targetProject,
    targetUser,
    targetPost,

    checkDomain,

    resetScrollRegionPosition,

    postsAnchorToBottom,

    profileDisplayingAllProjects,

    projectReturnView,
    projectShowingInfo,
    editingProjectMode,

    displayingAllMyProjects,
    displayingAllFollowingProjects,

    curMenu,
    curPrompt,
    getIsProjectTeamMember,

    dontAllowOverlayClose,
    promptOptions,
    
    goHome,

    showBetaFeatures,

    triggerNewThreadPost,
    triggerDeletePost,

    newConversation,
    newConversationUserIds,
    conversationGroupId,

    signInRequired,

    debugOutput,
} from '../models/appModel';

ConversationsModel.on('conversationAdded', onConversationAdded);
AppModel.on('showPrompt', onShowPrompt);
AppModel.on('gotoRoute', onGotoRoute);

export function loadProject(targetProjectId, options) {
    const path = get(curPath);
    if (!/\/projects\/.+/.test(path)) {
        lastPreProjectPath.set(path);
    }

    loadProjectItem(targetProjectId);

    if (gotoRoute('projects/' + targetProjectId)) {
        const showInfo = options && options.showInfo;
        projectShowingInfo.set(showInfo);
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
onConversationsUpdated(() => {
    if (!get(conversation) && get(conversationId)) {
        const targetConversationId = get(conversationId);
        setConversation(targetConversationId);
    }
});

function onConversationAdded(event) {
    conversationId.set(event.conversationId);
    setConversation(event.conversationId);
}

function onShowPrompt(promptId) {
    showPrompt(promptId);
}

function onGotoRoute(newPath) {
    gotoRoute(newPath);
}

function setViewedUser(targetProfileId, dontResetConversationGroup) {
    const curUserModel = getUser(targetProfileId);
    const curUser = get(curUserModel);

    if (!dontResetConversationGroup) {
        conversationGroupId.set(null); // ensure can reset viewed user when viewing conversation
    }

    loadUsers({ id: targetProfileId });
    viewedUser.set(curUser);
}

export function setUser(targetUserId) {
    const curUserModel = getUser(targetUserId);
    const curUser = get(curUserModel);

    if (curUser) {
        userId.set(targetUserId);
        user.set(curUser);

        if (curUser && curUser.loaded && (!curUser.username || curUser.set === false)) {
            (async() => {
                await tick();
                if (DEBUG) {
                    console.log('curUser', curUser);
                }
                if (curUser.resetPass) {
                    showPrompt(promptIds.RESET_PASSWORD);
                } else {
                    showPrompt(promptIds.SET_ACCOUNT);
                }
            })();
        }
    }
}

onUsersUpdated(() => {
    // if project object not found but project id set then update project model
    if (get(profileId) && (!get(viewedUser) || !get(viewedUser).loaded)) {
        const targetProfileId = get(profileId);
        setViewedUser(targetProfileId, true);
    }
    // if (get(userId) && (!get(user) || !get(user).loaded || get(user).id !== get(userId))) { // is already loaded, but still need to set user object
    if (get(userId)) { // force user object to update - to improve?
        setUser(get(userId));
    }
});

export function setNavSection(section) {
    const path = get(curPath);
    if ((!section.segment && (path === '/' || path === '/home')) || '/' + section.segment === path) {
        switch (section.segment) {
            case undefined:
                goHome();
                return;
            case 'discover':
                if (!get(showBetaFeatures)) {
                    goHome();
                    return;
                }
                break;
            default:
                break;
        }
    }

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

    editingProjectMode.set((options && options.editingProjectMode) || 'edit');
    // editingProject.set(options && options.editingProject);

    goto('projects/' + get(projectId) + '/details');
    resetScrollRegionPosition('details');
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
        if ((!get(projectId) || !get(project) || get(projectId) !== curChannel.projectId) && curChannel.projectId) {
            loadProjectItem(curChannel.projectId);
        }
    }
}

export function addAndSetConversation(conversation) {
    if (conversation && conversation.id) {
        mergeConversations([conversation]);
        setConversation(conversation.id);
    }
}

export async function loadPost(targetPostId, options) {
    loadPosts({ id: targetPostId, getFollowState: true });

    postId.set(targetPostId);
    setPost(targetPostId);

    postsAnchorToBottom.set(options && options.anchorToBottom);

    const path = get(curPath);
    if (!path || !path.match(/posts\/.+\/edit/)) {
        gotoRoute('posts/' + targetPostId );
        resetScrollRegionPosition('thread');

        // await tick();
        // setTimeout(() => {
        //     if (options && options.reply) {
        //         newThreadPost();
        //     }
        // }, 200); // find better way, don't scroll to bottom
    }
}

function setPost(targetPostId) {
    const curPostModel = getPost(targetPostId);
    const curPost = get(curPostModel);

    post.set(curPost);

    if (curPost) {
        if ((!get(channelId) || !get(channel) || get(channelId) !== curPost.channelId) && curPost.channelId) {
            loadChannelItem(curPost.channelId);
        }
        if ((!get(projectId) || !get(project) || get(projectId) !== curPost.projectId) && curPost.projectId) {
            loadProjectItem(curPost.projectId);
        }
    }
}

export function loadProfile(targetProfileId, options) {
    profileId.set(targetProfileId);

    setViewedUser(targetProfileId);
    // const curUserModel = getUser(targetProfileId);
    // const curUser = get(curUserModel);
    // viewedUser.set(curUser);

    if (gotoRoute('profile/' + targetProfileId)) {
        profileDisplayingAllProjects.set(false);
    }
    resetScrollRegionPosition('profile');
}

function getUserConversationId(targetConversationId) {
    let userId = null;
    if (targetConversationId.indexOf('u-') === 0) {
        userId = targetConversationId.substr(2);
    }
    return userId;
}

function getProjectConversationId(targetConversationId) {
    let projectId = null;
    if (targetConversationId.indexOf('p-') === 0) {
        projectId = targetConversationId.substr(2);
    }
    return projectId;
}

function targetConversationLoaded(result) {
    // console.log('conversationLoaded', result);
    if (result && !result.error) {
        if (result.conversations && result.conversations.length) {
            const conversation = result.conversations[0];
            if (conversation.id) {
                mergeConversations([conversation]);
                loadConversation(conversation.id, true);
            }
        } else if (get(userId)) {
            newConversation.set(true);
        }
    }
};

export function loadConversation(targetConversationId, isRedirectedId, forceLoad) {
    // if (!checkLoggedIn()) { return; }

    newConversation.set(false);

    // console.log('loadConversation', targetConversationId);

    if (!isRedirectedId) {
        conversationGroupId.set(targetConversationId);
    }

    const conversationUserId = getUserConversationId(targetConversationId);
    if (conversationUserId) {
        clearConversation();

        const targetUserIds = [conversationUserId];
        newConversationUserIds.set(targetUserIds);

        setViewedUser(conversationUserId, true);

        const usersId = getConversationUsersId(targetUserIds);
        loadConversations({ usersId }, targetConversationLoaded);
        return;
    }

    const conversationProjectId = getProjectConversationId(targetConversationId);
    if (conversationProjectId) {
        loadConversations({ projectId: conversationProjectId }, targetConversationLoaded);
        return;
    }

    const curConversation = get(conversation);
    if (!curConversation || curConversation.id !== targetConversationId || forceLoad) {
        // debugOutput.set('loadConversation: ' + targetConversationId);
        // console.log('loadConversations');
        loadConversations({ id: targetConversationId }, (result) => {
			// debugOutput.set(get(debugOutput) + '<br/>loaded conversations ' + targetConversationId + ' ' + (result.conversations && result.conversations.length));
            if (!result.error && forceLoad) {
                setConversation(targetConversationId); // set conversation after new thread force reload to ensure header updated
            }
            return result;
        });
    }

    conversationId.set(targetConversationId);
    setConversation(targetConversationId);

    // const curConversation = conversations.find(item => item.id === targetConversationId);
    // conversation.set(curConversation);

    if (!isRedirectedId) {
        gotoRoute('messages/' + targetConversationId);
    }
    resetScrollRegionPosition('conversation');
}

function clearConversation() {
    conversationId.set(null);
    conversation.set(null);
}

export function loadConversationByUser(userId) {
    gotoRoute('messages/u-' + userId);
    resetScrollRegionPosition('conversation');
}

export function loadConversationByProject(projectId) {
    gotoRoute('messages/p-' + projectId);
    resetScrollRegionPosition('conversation');
}

function setConversation(targetConversationId) {
    const curConversationModel = getConversation(targetConversationId);
    const curConversation = get(curConversationModel);

    // console.log('setConversation', conversation, targetConversationId);
    conversation.set(curConversation);

    // debugOutput.set(get(debugOutput) + '<br/>setConversation ' + targetConversationId + ' ' + curConversation);

    if (curConversation) {
        if (curConversation.projectId && (!get(projectId) || !get(project) || get(projectId) !== curConversation.projectId)) {
            loadProjectItem(curConversation.projectId);
        }
    }
}

export function messageUser(userId) {
    if (!checkLoggedIn()) { return; }

    loadConversationByUser(userId);
    // loadConversation('r70dp2bf');
}

function gotoRoute(newPath) {
    // console.log(getPagePath()+ ' !== /' + newPath + ' : ' + (getPagePath() !== '/' + newPath));
    if (getPagePath() !== '/' + newPath.split(' ').join('%20') && typeof window !== 'undefined') { //  && !/\/projects\/.*\/details/.test(get(curPath)) //  && !/\/channels\/.*\/post/.test(get(curPath))
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
        if (!menuId && DEBUG) { console.error('Menu undefined: ' + promptId); }
        curMenu.set(menuId);
    }
}

export function showPrompt(promptId, options) {
    if (get(curPrompt) !== promptId) {
        dontAllowOverlayClose.set(options && options.allowClose === false);
        switch (promptId) {
            case promptIds.SIGN_UP:
                signInRequired.set(options && options.signInRequired);
                break;
        }

        promptOptions.set(options || null);

        hideMenu();
        if (promptId) {
            curPrompt.set(promptId);
        } else if (DEBUG) {
            throw new Error('Prompt undefined: ' + promptId);
        }
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

export function showSharePostDialog(postId) {
    const postModel = getPost(postId);
    const post = get(postModel);

    targetPost.set(post);

    showPrompt(promptIds.SHARE_POST);
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

export function showDeletePostDialog() {
    showPrompt(promptIds.DELETE_POST);
}

export function login(details) {
    details.username = trim(details.username);
    username.set(details.username);

    loggingIn.set(true);

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
        loggingIn.set(false);
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

    await tick();
    checkDomain();

    // if (!dontDisplayMessage) {
    //     await tick();
    //     showPrompt(promptIds.LOGGED_OUT);
    // }
}

export function checkLoggedIn() {
    if (!get(user)) {
        if (!get(userId)) {
            showPrompt(promptIds.SIGN_UP, {signInRequired: true});
        }

        return false;
    }
    return true;
}

export function loadCurrentUser() {
    if (get(userId) && !get(user) && !get(loadingUsers)) { // TODO: not to check if loading here?
        loadUsers( { id: get(userId) } );
    }
}
export function loadCurrentProject() {
    if (get(projectId) && !get(project) && !get(loadingProjects)) { // TODO: not to check if loading here?
        loadProjects( { id: get(projectId) } );
    }
}

export function loadCurrentChannel() {
    if (get(channelId) && !get(channel) && !get(loadingChannels)) { // TODO: not to check if loading here?
        loadChannels( { id: get(channelId) } );
    }
}

export function editCurrentPost() {
    const curTargetPost = get(targetPost);
    if (curTargetPost) {
        editPost(curTargetPost.id);
    }
}

export function deleteCurrentPost() {
    const curTargetPost = get(targetPost);
    if (curTargetPost) {
        triggerDeletePost(curTargetPost);
    }
}

export function loadCurrentPost() {
    if (get(postId) && !get(post) && !get(loadingPosts)) { // TODO: not to check if loading here?
        loadPosts( { id: get(postId) } );
    }
}

export function loadCurrentConversation() {
    if (get(conversationId) && !get(conversation)) { // && !get(loadingConversations)) {
        loadConversations( { id: get(conversationId) } );
    }
}

export function newProjectPost() {
    if (!checkLoggedIn()) { return; }

    postType.set('projectPost');
    // goto('posts/new');
}

export function newThread() {
    if (!checkLoggedIn()) { return; }
    
    postType.set('thread');
    // goto('posts/new');
}

export function newThreadPost() {
    if (!checkLoggedIn()) { return; }

    postType.set('threadPost');
    triggerNewThreadPost();
    // goto('posts/new');
}

export function editPost(postId) {
    goto('posts/' + postId + '/edit');
}

// export function removePostFromChannel(channelId, postId) {
//     deletePostFromChannel(channelId, postId);
// }


export function copyProjectLink(projectId) {
    const url = location.protocol + '//' + location.host + '/projects/' + projectId;
    copyToClipboard(url);
}

export function copyProfileLink(userId) {
    const url = location.protocol + '//' + location.host + '/profile/' + userId;
    copyToClipboard(url);
}

export function copyPostLink(postId) {
    const url = location.protocol + '//' + location.host + '/posts/' + postId;
    copyToClipboard(url);
}