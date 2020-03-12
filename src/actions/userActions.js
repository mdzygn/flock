import { get } from 'svelte/store';
import { DEBUG } from '../config';

import {
    requestConnectionSent,
} from '../models/appState.js';

export function requestConnection(userId) {
    requestConnectionSent.set(true);
}