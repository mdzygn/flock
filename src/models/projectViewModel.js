import { createModel } from '../utils/createModel';

const projectViewModel = createModel({
    returnView: false,
    showingInfo: false,
    editingProject: false,
}, {persist: true}, 'projectViewState');

export const returnView = projectViewModel.returnView;
export const showingInfo = projectViewModel.showingInfo;
export const editingProject = projectViewModel.editingProject;

export default projectViewModel;