import { writable } from 'svelte/store';
import { get } from 'svelte/store';

import { createModel } from '../utils/createModel';
import { init } from 'svelte/internal';

const appModel = createModel({
    projectId: null,
    channelId: null,
    threadId: null,
    conversationId: null,
    profileId: null,

    viewMode: 'discover',
    locationMode: 'global',
    exploreZoomed: false,

    profileDisplayingAllProjects: false,

    projectReturnView: false,
    projectShowingInfo: false,
    editingProject: false,

    displayingAllMyProjects: false,
    displayingAllFollowingProjects: false,
    displayingArchivedProjects: false,

    projectsSearchString: '',
}, {persist: true}, 'appState');

export const curPath = writable(null);

export const projectId = appModel.projectId;
export const channelId = appModel.channelId;
export const threadId = appModel.threadId;
export const conversationId = appModel.conversationId;
export const profileId = appModel.profileId;

export const unsavedChanges = writable(false);

export const project = writable(null);
export const conversation = writable(null);
export const viewedUser = writable(null);

export const targetProject = writable(null);
export const targetUser = writable(null);

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
export const editingProject = appModel.editingProject;

export const projectsSearchString = appModel.projectsSearchString;

export const displayingAllMyProjects = appModel.displayingAllMyProjects;
export const displayingAllFollowingProjects = appModel.displayingAllFollowingProjects;
export const displayingArchivedProjects = appModel.displayingArchivedProjects;

initApp();

function initApp() {
    //TODO: implement for reload and all svelte route navigation
    // if (typeof window !== 'undefined') {
    //     window.onbeforeunload = function(){
    //         return unsavedChanges;
    //     };
    // }
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
        // scrollRegionReset.set({id});
        scrollRegionProperties.set(curScrollRegionProperties);
    }
}

// export function updateScrollRegionPosition(id, scrollTop) {
//     scrollRegionUpdated.set({id, scrollTop});
// }

// if storing scroll position in local storage
// export function updateScrollRegionProperties(id) {
//     if (!id) {
//         return null;
//     }
//     let curScrollRegionProperties = get(scrollRegionProperties);
//     if (curScrollRegionProperties[id]) {
//         scrollRegionProperties.set(curScrollRegionProperties);
//     }
// }

export default appModel;