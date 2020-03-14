import { createModel } from '../utils/createModel';

const projectViewState = createModel({
    returnView: false,
    showingInfo: false,
    hasCreated: false,
}, {persist: true});

export const returnView = projectViewState.returnView;
export const showingInfo = projectViewState.showingInfo;
export const hasCreated = projectViewState.hasCreated;

export default projectViewState;