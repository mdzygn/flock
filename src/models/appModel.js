import { writable } from 'svelte/store';
import { DEBUG } from '../config';

const localStorage = typeof window !== 'undefined' ? window.localStorage : undefined;

const appState = loadState();

setDefaultState(appState, 'viewMode', 'discover');
setDefaultState(appState, 'locationMode', 'global');
setDefaultState(appState, 'exploreZoomed', false);

export const viewMode = writable(appState.viewMode);
export const locationMode = writable(appState.locationMode);
export const exploreZoomed = writable(appState.exploreZoomed);

viewMode.subscribe(val => {appState.viewMode = val; saveState()});
locationMode.subscribe(val => {appState.locationMode = val; saveState()});
exploreZoomed.subscribe(val => {appState.exploreZoomed = val; saveState()});

function setDefaultState(model, key, defaultValue) {
    if (model[key] === undefined) {
        model[key] = defaultValue;
    }
}

function saveState() {
    if (!localStorage) {
        return;
    }

    console.log('save appState', appState);

    localStorage.setItem('appState', JSON.stringify(appState));
}

function loadState() {
    let appState = {};
    if (!localStorage) {
        return appState;
    }
    const appStateString = localStorage.getItem('appState');

    console.log('load appState', appStateString);

    if (appStateString) {
        try {
            appState = JSON.parse(appStateString);
        } catch (e) {
            if (DEBUG) {
                console.warn('error loading app state from ' + appStateString);
            }
        }
    }
    return appState;
}