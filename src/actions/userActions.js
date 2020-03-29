import { get } from 'svelte/store';
// import { DEBUG } from '../config';

import { copyToClipboard } from '../utils';

import {
    viewedUser,
} from '../models/appModel';

import {
    getUser,
} from '../models/usersModel';

export function requestConnection(userId) {
    const curViewedUser = get(viewedUser);

    const userModel = getUser(userId);
    const user = userModel;

    user.requestedConnection = true;

    if (curViewedUser && user.id === curViewedUser.id) {
        viewedUser.set(user);

        // TODO: request connection
    }
}

export function reportUser(userId) {
    const userModel = getUser(userId);
    const user = userModel;

    user.reported = true;

    const curViewedUser = get(viewedUser);
    if (curViewedUser && user.id === curViewedUser.id) {
        viewedUser.set(user);

        // TODO: report user
    }
}

export function copyProfileLink(userId) {
    const url = location.protocol + '//' + location.host + '/profile/' + userId;
    copyToClipboard(url);
}