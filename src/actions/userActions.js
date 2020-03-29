import { get } from 'svelte/store';
// import { DEBUG } from '../config';

import { copyToClipboard } from '../utils';

import {
    viewedUser,
} from '../models/appModel';

import {
    getUser,
} from '../models/usersModel';

function checkUpdateUser(targetUser) {
    const curViewedUser = get(viewedUser);
    if (curViewedUser && curViewedUser.id === targetUser.id) {
        viewedUser.set(targetUser);
    }
}
export function requestConnection(userId) {
    const userModel = getUser(userId);
    const user = userModel;

    user.requestedConnection = true;
    checkUpdateUser(user);

    // TODO: request connection
}

export function reportUser(userId) {
    const userModel = getUser(userId);
    const user = userModel;

    user.reported = true;
    checkUpdateUser(user);

    // TODO: report user
}

export function copyProfileLink(userId) {
    const url = location.protocol + '//' + location.host + '/profile/' + userId;
    copyToClipboard(url);
}