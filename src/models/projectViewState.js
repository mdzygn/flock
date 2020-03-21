import { createModel } from '../utils/createModel';

const projectViewState = createModel({
    returnView: false,
    showingInfo: false,
}, {persist: true}, 'projectViewState');

export const returnView = projectViewState.returnView;
export const showingInfo = projectViewState.showingInfo;

export default projectViewState;