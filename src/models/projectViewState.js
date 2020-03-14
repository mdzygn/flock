import { createModel } from '../utils/createModel';

const projectViewState = createModel({
    returnView: false,
    showingInfo: false,
    hasCreated: false,
    // following: false,
    // owner: false,
    // isNew: false,
    // liked: false,
}, {persist: true});

export const returnView = projectViewState.returnView;
export const showingInfo = projectViewState.showingInfo;
export const hasCreated = projectViewState.hasCreated;
// export const following = projectViewState.following;
// export const owner = projectViewState.owner;
// export const isNew = projectViewState.isNew;
// export const liked = projectViewState.liked;

export default projectViewState;