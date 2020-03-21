import { createModel } from '../utils/createModel';

const projectViewModel = createModel({
    returnView: false,
    showingInfo: false,
}, {persist: true}, 'projectViewState');

export const returnView = projectViewModel.returnView;
export const showingInfo = projectViewModel.showingInfo;

export default projectViewModel;