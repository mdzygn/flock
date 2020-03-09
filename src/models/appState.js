import { createModel } from '../utils/createModel';

const appState = createModel({
    viewMode: 'discover',
    locationMode: 'global',
    exploreZoomed: false,
}, {persist: true});

export const viewMode = appState.viewMode;
export const locationMode = appState.locationMode;
export const exploreZoomed = appState.exploreZoomed;

export default appState;