import api from '../api';

// import config from "../config";

import { get } from 'svelte/store';
// import { goto } from '@sapper/app';
// import { DEBUG } from '../config';

import { copyToClipboard, generateId } from '../utils';

import promptIds from '../config/promptIds';

import {
    viewedUser,
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

export function setAccountDetails(userDetails) {
    updateUser(userDetails);
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

    const newUserDetails = Object.assign({}, newUser);
    newUserDetails.username = '';

    loadingUsers.set(true);
	api.addUser({details: newUserDetails}).then(result => {
        if (result && !result.error) {
            if (!result.invalid) {
                // newUser._id = result.insertedId;


                const localUserDetails = Object.assign({}, newUser);
                delete localUserDetails.email;

                // TODO: use added item
                mergeUsers([localUserDetails]);
                setUser(newUser.id);

                username.set(newUser.username);
                usercode.set(newUser.usercode);

                showPrompt(promptIds.SET_ACCOUNT);

                // goto('profile/' + newUser.id);
            } else {
                switch (result.errorType) {
                    case 'username_exists':
                        showPrompt(promptIds.USERNAME_EXISTS);
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

function updateUser(userDetails) {
    if (userDetails && userDetails.id) {
        const curUserId = userDetails.id;
        delete userDetails.id;

        const curUserModel = getUser(curUserId);
        if (curUserModel) {
            const curUser = get(curUserModel);

            const localUserDetails = Object.assign({}, userDetails);
            delete localUserDetails.pass;

            Object.assign(curUser, localUserDetails);
            // console.log(curUser);

            // api.updateUser({id: curUserId, details: userDetails});
        }
    }
}
