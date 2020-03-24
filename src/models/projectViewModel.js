import { createModel } from '../utils/createModel';

const projectViewModel = createModel({
    returnView: false,
    showingInfo: false,
    editingProject: false,
    displayingAllMyProjects: false,
    displayingAllFollowingProjects: false,
    projectsSearchString: '',
}, {persist: true}, 'projectViewState');

export const returnView = projectViewModel.returnView;
export const showingInfo = projectViewModel.showingInfo;
export const editingProject = projectViewModel.editingProject;

export const projectsSearchString = projectViewModel.projectsSearchString;
export const displayingAllMyProjects = projectViewModel.displayingAllMyProjects;
export const displayingAllFollowingProjects = projectViewModel.displayingAllFollowingProjects;

export default projectViewModel;