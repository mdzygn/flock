import { get } from 'svelte/store';
import { DEBUG } from '../config';

import {
    viewedUser,
} from '../models/appModel';

export function requestConnection(userId) {
    const curViewedUser = get(viewedUser);
    if (curViewedUser) {
        curViewedUser.requestedConnection = true;
        const newUser = get(viewedUser);
        viewedUser.set(newUser);
    }
}