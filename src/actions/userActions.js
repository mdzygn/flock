import config from "../config";

import { get } from 'svelte/store';
// import { DEBUG } from '../config';

import { copyToClipboard } from '../utils';

import {
    viewedUser,
    user,
    userId,
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
    const user = get(userModel);

    user.requestedConnection = true;
    checkUpdateUser(user);

    // TODO: request connection
}

export function reportUser(userId) {
    const userModel = getUser(userId);
    const user = get(userModel);

    user.reported = true;
    checkUpdateUser(user);

    // TODO: report user
}

export function copyProfileLink(userId) {
    const url = location.protocol + '//' + location.host + '/profile/' + userId;
    copyToClipboard(url);
}

export function setUser(targetUserId) {
    const curUserModel = getUser(targetUserId);
    const curUser = get(curUserModel);

    if (curUser) {
        userId.set(targetUserId);
        user.set(curUser);
        // console.log(get(user));
    }
}

export function logOut() {
    userId.set(null);
    user.set(null);
}

export function checkUser(query) {
    if (query && query.admin !== undefined) {
        setUser(config.MAIN_USER);
    } else if (query && query.general !== undefined) {
        setUser(config.GENERAL_USER);
    } else  if (query && query.x !== undefined) {
        logOut();
    } else if (get(userId) && !get(user)) {
        setUser(get(userId));
    }
}