import { createModel } from '../utils/createModel';

const appState = createModel({
    projectId: 'm62lsp2o',

    viewMode: 'discover',
    locationMode: 'global',
    exploreZoomed: false,
}, {persist: true});

export const projectId = appState.projectId;
export const viewMode = appState.viewMode;
export const locationMode = appState.locationMode;
export const exploreZoomed = appState.exploreZoomed;

export default appState;