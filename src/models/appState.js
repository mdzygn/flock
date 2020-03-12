import { writable, readable } from 'svelte/store';
import { get } from 'svelte/store';

import { createModel } from '../utils/createModel';

const appState = createModel({
    projectId: 'm62lsp2o',
    channelId: '7m2ldksm',
    threadId: 'sm2ld9p2',
    conversationId: 'a4kcmsd3',
    profileId: 'bl20a8lm',

    viewingOwnProfile: false,
    requestConnectionSent: false,

    viewMode: 'discover',
    locationMode: 'global',
    exploreZoomed: false,

    // scrollRegionProperties: {},
}, {persist: true});

export const projectId = appState.projectId;
export const channelId = appState.channelId;
export const threadId = appState.threadId;
export const conversationId = appState.conversationId;
export const profileId = appState.profileId;

export const viewingOwnProfile = appState.viewingOwnProfile;
export const newMessage = appState.newMessage;
export const requestConnectionSent = appState.requestConnectionSent;

export const viewMode = appState.viewMode;
export const locationMode = appState.locationMode;
export const exploreZoomed = appState.exploreZoomed;

export const scrollRegionProperties = writable({});
// const scrollRegionProperties = writable({});
// export const scrollRegionReset = writable(null);
// const scrollRegionProperties = appState.scrollRegionProperties;

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

export default appState;