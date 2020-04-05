import api from '../api';

import config from "../config";

import { tick } from 'svelte';
import { get } from 'svelte/store';
import { goto } from '@sapper/app';
// import { DEBUG } from '../config';

import { copyToClipboard, generateId } from '../utils';

import promptIds from '../config/promptIds';

import {
    viewedUser,
    user,
    userId,
    username,
    usercode,
} from '../models/appModel';

import {
    getUser,
    mergeUsers,
    loadingUsers,
} from '../models/usersModel';

import {
    showPrompt,
    setUser,
    checkLoggedIn,
} from '../actions/appActions';

function checkUpdateUser(targetUser) {
    const curViewedUser = get(viewedUser);
    if (curViewedUser && curViewedUser.id === targetUser.id) {
        viewedUser.set(targetUser);
    }
}
export function requestConnection(userId) {
    if (!checkLoggedIn()) { return; }

    const userModel = getUser(userId);
    const user = get(userModel);

    user.requestedConnection = true;
    checkUpdateUser(user);

    // TODO: request connection
}

export function reportUser(userId) {
    if (!checkLoggedIn()) { return; }

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

export async function logOut(dontDisplayMessage) {
    const curUser = get(user);
    if (curUser && get(viewedUser) && curUser.id === get(viewedUser).id) {
        viewedUser.set(get(viewedUser));
    }
    userId.set(null);
    user.set(null);

    if (!dontDisplayMessage) {
        await tick();
        showPrompt(promptIds.LOGGED_OUT);
    }
}

export function createUser(newUserModel) {
    const newUser = get(newUserModel);

    if (newUser) {
        newUser.usercode = generateId();

        addUser(newUserModel);
    }
}

function addUser(newUserModel) {
	const newUser = get(newUserModel);

    // newUser.usercode = ''; // test breaking

	newUser.createdAt = (new Date()).getTime(); // use for initial sort values
	newUser.modifiedAt = newUser.createdAt;
	newUser.lastActiveAt = newUser.createdAt;

    loadingUsers.set(true);
	api.addUser({details: newUser}).then(result => {
        if (result && !result.error) {
            if (!result.invalid) {
                // newUser._id = result.insertedId;

                // TODO: use added item
                mergeUsers([newUser]);
                setUser(newUser.id);

                username.set(newUser.username);
                usercode.set(newUser.usercode);

                // goto('profile/' + newUser.id);
            } else {
                switch (result.errorType) {
                    case 'username_exists':
                        showPrompt(promptIds.SIGN_UP_USERNAME_EXISTS);
                        break;
                    case 'email_exists':
                        showPrompt(promptIds.SIGN_UP_EMAIL_EXISTS);
                        break;
                }
            }
        }
        loadingUsers.set(false);
	});

	// const curUsers = get(users);
	// curUsers.unshift(newUserModel);
	// users.set(curUsers);

	return newUserModel;
}