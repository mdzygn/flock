import { createModel } from '../utils/createModel';

const projectViewState = createModel({
    collapsed: false,
    following: false,
    owner: false,
    isNew: false,
    showingInfo: false,
    liked: false,
}, {persist: true});

export const collapsed = projectViewState.collapsed;
export const following = projectViewState.following;
export const owner = projectViewState.owner;
export const isNew = projectViewState.isNew;
export const showingInfo = projectViewState.showingInfo;
export const liked = projectViewState.liked;

export default projectViewState;