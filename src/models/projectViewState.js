import { createModel } from '../utils/createModel';

const projectViewState = createModel({
    returnView: false,
    following: false,
    owner: false,
    isNew: false,
    hasCreated: false,
    showingInfo: false,
    liked: false,
}, {persist: true});

export const returnView = projectViewState.returnView;
export const following = projectViewState.following;
export const owner = projectViewState.owner;
export const isNew = projectViewState.isNew;
export const hasCreated = projectViewState.hasCreated;
export const showingInfo = projectViewState.showingInfo;
export const liked = projectViewState.liked;

export default projectViewState;