import { get } from 'svelte/store';
import { DEBUG } from '../config';

import {
    following,
    liked,
} from '../models/projectViewState.js';

export function projectToggleFollowing(projectId) {
    const newState = !get(following);
    following.set(newState);
}

export function projectToggleLiked(projectId) {
    const newState = !get(liked);
    liked.set(newState);
}