import { get } from 'svelte/store';
import { DEBUG } from '../config';

import {
    following,
} from '../models/projectViewState.js';

export function projectToggleFollowing(projectId) {
    // if (DEBUG) console.log('toggle following on project "' + projectId + '"');
    const newState = !get(following);
    following.set(newState);
}