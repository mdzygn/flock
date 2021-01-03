import config from '../config';

import { writable } from 'svelte/store';
import { get } from 'svelte/store';

import EventEmitter from 'eventemitter3';

import { createModel } from '../utils/createModel';
// import { init } from 'svelte/internal';

const AppModel = new EventEmitter();
// export default AppModel;

const appModel = createModel({
    projectId: null,
    channelId: null,
    postId: null,
    conversationId: null,
    profileId: null,
    userId: null, // 'bl20a8lm', // default user

    username: null,
    usercode: null,

    postType: null,

    viewMode: 'discover',
    locationMode: 'global',
    exploreZoomed: false,

    showBetaFeatures: false,
    showProjectCounts: false,

    profileDisplayingAllProjects: false,

    projectReturnView: false,
    projectShowingInfo: false,
    editingProjectMode: 'edit',

    displayingAllMyProjects: false,
    displayingAllFollowingProjects: false,

    postsAnchorToBottom: false,

    draftPosts: {},

    projectsSearchString: '',
    projectsArchiveSearchString: '',
    discoverSearchString: '',
    discoverFilterString: '',

    newConversation: false,
    newConversationUserIds: [],

}, {persist: true}, 'appState', AppModel);

export const curPath = writable(null);
export const prevPath = writable(null);

export const lastPreProjectPath = writable(null);

export const projectId = appModel.projectId;
export const channelId = appModel.channelId;
export const postId = appModel.postId;
export const conversationId = appModel.conversationId;
export const profileId = appModel.profileId;
export const userId = appModel.userId;

const draftPosts = appModel.draftPosts;

export const loggingIn = writable(false);

export const unsavedChanges = writable(false);

export const signInRequired = writable(false);

export const showBetaFeatures = appModel.showBetaFeatures;
export const showProjectCounts = appModel.showProjectCounts;

export const project = writable(null);
export const conversation = writable(null);
export const viewedUser = writable(null);
export const user = writable(null);
export const channel = writable(null);
export const post = writable(null);

export const postType = appModel.postType;

export const username = appModel.username;
export const usercode = appModel.usercode;

export const postsAnchorToBottom = appModel.postsAnchorToBottom;

export const targetProject = writable(null);
export const targetUser = writable(null);
export const targetPost = writable(null);

export const savingPost = writable(false);
export const savingPostId = writable(null);

export const newMessage = appModel.newMessage;

export const viewMode = appModel.viewMode;
export const locationMode = appModel.locationMode;
export const exploreZoomed = appModel.exploreZoomed;

export const curMenu = writable(null);
export const curPrompt = writable(null);

export const scrollRegionProperties = writable({});
// const scrollRegionProperties = writable({});
// export const scrollRegionReset = writable(null);
// const scrollRegionProperties = appModel.scrollRegionProperties;

export const profileDisplayingAllProjects = appModel.profileDisplayingAllProjects;

export const projectReturnView = appModel.projectReturnView;
export const projectShowingInfo = appModel.projectShowingInfo;
export const editingProjectMode = appModel.editingProjectMode;

export const projectsSearchString = appModel.projectsSearchString;
export const projectsArchiveSearchString = appModel.projectsArchiveSearchString;
export const discoverSearchString = appModel.discoverSearchString;
export const discoverFilterString = appModel.discoverFilterString;

export const displayingAllMyProjects = appModel.displayingAllMyProjects;
export const displayingAllFollowingProjects = appModel.displayingAllFollowingProjects;

export const logInFormValidated = writable(false);
export const signUpFormValidated = writable(false);
export const setAccountFormValidated = writable(false);
export const forgotPasswordFormValidated = writable(false);

export const dontAllowOverlayClose = writable(false);
export const newUsername = writable(null);

export const newConversation = appModel.newConversation;
export const newConversationUserIds = appModel.newConversationUserIds;
export const conversationGroupId = writable(null);

export const savingConversationId = writable(null);

export const debugOutput = writable('');

export const dateDebugOffset = writable(3600 * 1000);

initApp();

function initApp() {
    checkDomain();

    //TODO: implement for reload and all svelte route navigation
    // if (typeof window !== 'undefined') {
    //     window.onbeforeunload = function(){
    //         return unsavedChanges;
    //     };
    // }
}

export function checkDomain() {
    if (typeof window !== 'undefined' && !config.LOCAL) {
        if (!get(userId) || !get(usercode)) {
            // restore when can upload to flockprojects.com
            /*if (!config.STAGING_TEST && location.href.indexOf("flock-hub.herokuapp.com") !== -1) {
                let newUrl = location.href;
                if (location.protocol.indexOf("https") === -1 && location.protocol.indexOf("http") !== -1) {
                    newUrl = newUrl.replace("http", "https");
                }
                newUrl = newUrl.replace("flock-hub.herokuapp.com", "flockprojects.com");
                location.href = newUrl;
            } else */
            if (location.protocol.indexOf("https") === -1 && location.protocol.indexOf("http") !== -1) {
                location.href = location.href.replace("http", "https");
            }
        }
    }
}

export function getScrollRegionProperties(id) {
    if (!id) {
        return null;
    }
    let curScrollRegionProperties = get(scrollRegionProperties);
    if (!curScrollRegionProperties[id]) {
        curScrollRegionProperties[id] = {
            scrollTop: 0,
        };
        scrollRegionProperties.set(curScrollRegionProperties);
    }
    curScrollRegionProperties = get(scrollRegionProperties);
    return curScrollRegionProperties[id];
}

export function resetScrollRegionPosition(id) {
    if (!id) {
        return null;
    }
    let curScrollRegionProperties = get(scrollRegionProperties);
    if (curScrollRegionProperties[id]) {
        curScrollRegionProperties[id].inited = false;
        scrollRegionProperties.set(curScrollRegionProperties);
    }
}

export function getIsCurrentUser(targetUserId) {
    const curUserId = get(userId);
	return (targetUserId === curUserId);
}

export function getIsProjectTeamMember(project) {
    const curUserId = get(userId);
	return (project && curUserId && project.team && project.team.includes(curUserId));
}

export function checkParams(query) {
    if (query.beta !== undefined) {
        showBetaFeatures.set(true);
    } else if (query.xbeta !== undefined) {
        showBetaFeatures.set(false);
    }

    showProjectCounts.set((query.counts !== undefined));
}

// not correct on initial site load for moment
export function isUserLoaded(user, userId, loggingIn) {
    return !loggingIn && (!userId || (user && user.loaded));
}

export function isProjectLoaded(project, projectId) {
    return project && project.id === projectId;
}

export function getContentImage(imageUrl, thumb) {
	if (imageUrl) {
		const contextIndex = imageUrl.indexOf(config.CONTENT_IDENTIFIER_PATH);
		if (contextIndex === 0) {
            let imagePath = imageUrl.substr(config.CONTENT_IDENTIFIER_PATH.length);
            const extensionIndex = imagePath.lastIndexOf('.');
            if (thumb && extensionIndex !== -1) {
                imagePath = imagePath.substr(0, extensionIndex) + '-thumb' + imagePath.substr(extensionIndex);
            }
			return config.USER_CONTENT_URL + imagePath;
		}
	}
	return null;
}

export function getHeaderImage(imageUrl, thumb) {
	if (imageUrl) {
		const contextIndex = imageUrl.indexOf(config.CONTENT_IDENTIFIER_PATH);
		if (contextIndex === 0) {
            return getContentImage(imageUrl, thumb);
		} else {
			return config.SITE_CONTENT_URL + (thumb ? config.headerImageLibraryThumbFolder : config.headerImageLibraryFolder) + imageUrl + config.headerImageExtension;
		}
	}
	return null;
}

export function goHome() {
    discoverSearchString.set('');
    discoverFilterString.set('');
    AppModel.emit('home');
}


export function saveDraftPost(curPostType, draftId, editPost, draftPost) {
    const curPost = getDraftPost(curPostType, draftId, editPost, true);

    // console.log('saveDraftPost', curPostType, draftId, editPost, JSON.parse(JSON.stringify(curPost)));

    curPost.id = draftId;

    Object.assign(curPost, draftPost);

    const curDraftPosts = get(draftPosts);
    draftPosts.set(curDraftPosts);

    // ^^ console.log('draftPosts', curDraftPosts);

    return curPost;
}

export function getDraftPost(curPostType, draftId, editPost, create, remove) {
    // console.log('getDraftPost', curPostType, draftId, editPost);

    const curDraftPosts = get(draftPosts);
    if (!curDraftPosts) {
        curDraftPosts = {};
    }

    let postArray = null;
    if (editPost) {
        postArray = curDraftPosts.posts;
        if (!postArray && create) {
            postArray = curDraftPosts.posts = [];
        }
    } else {
        switch (curPostType) {
            case 'thread':
                postArray = curDraftPosts.channels;
                if (!postArray && create) {
                    postArray = curDraftPosts.channels = [];
                }
                break;
            default:
                postArray = curDraftPosts.threads;
                if (!postArray && create) {
                    postArray = curDraftPosts.threads = [];
                }
                break;
        }
    }

    let curDraft = null;
    if (postArray) {
        // console.log('getDraftPost', [...postArray]);

        curDraft = postArray.find(match => match.id === draftId);
        if (remove) {
            postArray.splice(postArray.indexOf(curDraft), 1);
            // console.log('clear getDraftPost', [...postArray]);

            draftPosts.set(get(draftPosts));
            // ^^ console.log('draftPosts', curDraftPosts);

            return;
        } else {
            if (!curDraft && create) {
                curDraft = {};
                postArray.push(curDraft);
            }
        }
    }

    return curDraft;
}

export function clearDraftPost(curPostType, draftId, editPost) {
    // console.log('clearDraftPost', curPostType, draftId, editPost);

    getDraftPost(curPostType, draftId, editPost, false, true);
}

export function triggerNewThreadPost() {
    AppModel.emit('newThreadPost');
}

export function triggerFollowPost(postId) {
    AppModel.emit('followPost', postId);
}

export default appModel;