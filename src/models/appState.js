import { writable } from 'svelte/store';
import { DEBUG } from '../config';

const appState = createModel({
    viewMode: 'discover',
    locationMode: 'global',
    exploreZoomed: 'false',
}, {persist: true});

export const viewMode = appState.viewMode;
export const locationMode = appState.locationMode;
export const exploreZoomed = appState.exploreZoomed;

export default appState;


function createModel(props, options) {
    const persist = options && options.persist;

    let localStorage = null;

    if (persist) {
        localStorage = typeof window !== 'undefined' ? window.localStorage : null;
    }

    const model = {};

    const _modelValues = loadState();

    let value;
    for (let key in props) {
        if (props.hasOwnProperty(key)) {
            value = props[key];

            // if (DEBUG) console.log('get ', key, _modelValues[key]);
            if (_modelValues[key] === undefined) {
                _modelValues[key] = value;
            }

            model[key] = writable(_modelValues[key]);
        }
    };
    if (persist) {
        for (let key in props) {
            if (props.hasOwnProperty(key)) {
                model[key].subscribe(val => {
                    _modelValues[key] = val;
                    // if (DEBUG) console.log('set ', key, _modelValues[key]);
                    saveModelState();
                });
            }
        };
    }

    function saveModelState() {
        if (localStorage) {
            const appStateString = JSON.stringify(_modelValues);
            if (DEBUG) console.log('save appState', appStateString);

            localStorage.setItem('appState', appStateString);
        }
    }

    function loadState() {
        let appState = {};
        if (persist && localStorage) {
            try {
                const appStateString = localStorage.getItem('appState');

                if (DEBUG) console.log('load appState', appStateString);

                if (appStateString) {
                    appState = JSON.parse(appStateString);
                }
            } catch (e) {
                if (DEBUG) console.warn('error loading app state', e);
            }
        }
        return appState;
    }

    return model;
}