import { writable } from 'svelte/store';
import { get } from 'svelte/store';

import { createModel } from '../utils/createModel';

const appModel = createModel({
    projectId: null,
    channelId: null,
    threadId: null,
    conversationId: null,
    profileId: null,

    viewMode: 'discover',
    locationMode: 'global',
    exploreZoomed: false,

    // scrollRegionProperties: {},
}, {persist: true});

export const curPath = writable(null);

export const projectId = appModel.projectId;
export const channelId = appModel.channelId;
export const threadId = appModel.threadId;
export const conversationId = appModel.conversationId;
export const profileId = appModel.profileId;

export const project = writable(null);
export const conversation = writable(null);
export const viewedUser = writable(null);

export const newMessage = appModel.newMessage;

export const viewMode = appModel.viewMode;
export const locationMode = appModel.locationMode;
export const exploreZoomed = appModel.exploreZoomed;

export const scrollRegionProperties = writable({});
// const scrollRegionProperties = writable({});
// export const scrollRegionReset = writable(null);
// const scrollRegionProperties = appModel.scrollRegionProperties;

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