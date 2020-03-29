import { get } from 'svelte/store';
import { DEBUG } from '../config';

import {
    viewedUser,
} from '../models/appModel';

export function requestConnection(userId) {
    // TODO: use provided userId
    const curViewedUser = get(viewedUser);
    if (curViewedUser) {
        curViewedUser.requestedConnection = true;
        const newUser = get(viewedUser);
        viewedUser.set(newUser);
    }
}

export function reportUser(userId) {
    // TODO: lookup provided user
    const curViewedUser = get(viewedUser);
    if (curViewedUser) {
        curViewedUser.reported = true;
        viewedUser.set(curViewedUser);

        // TODO: report user
    }
}