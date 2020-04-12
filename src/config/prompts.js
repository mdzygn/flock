import promptIds from './promptIds';

import { get } from 'svelte/store';

import {
    project,
    targetProject,
    targetUser,
    targetPost,
    signUpFormValidated,
    setAccountFormValidated,
    logInFormValidated,
} from '../models/appModel';

import {
    archiveProject,
    makePublic,
    makePrivate,
} from '../actions/projectActions';

import {
    showPrompt,
    copyPostLink,
    copyProjectLink,
    copyProfileLink,
} from '../actions/appActions';


const prompts = {
    PROJECT_ARCHIVE: {
        title: 'Archive Project',
        message: 'Are you sure you want to<br/>archive this project?',
        subMessage: 'It will no longer be<br/>editable by team members<br/>or visible to any followers',
        menuItems: [
            {
                label: 'Archive Project',
                action: () => { const p = get(project); p && p.id && archiveProject(p.id) },
                default: true,
            },
            {
                label: 'Cancel',
            },
        ],
    },
    PROJECT_ARCHIVED: {
        title: 'Project Archived',
        // title: 'Archive Project',
        // message: 'Project Archived',
        subMessage: 'No longer editable<br/>by team members<br/>or visible to any followers',
        menuItems: [
            {
                label: 'Ok',
            },
        ],
    },
    PROJECT_UNARCHIVED: {
        title: 'Project Unarchived',
        // title: 'Unarchive Project',
        // message: 'Project Unarchived',
        subMessage: 'Now editable by team members<br/>and visible to any followers',
        menuItems: [
            {
                label: 'Ok',
            },
        ],
    },

    MAKE_PUBLIC: {
        title: 'Make Public',
        message: 'Make this project public?',
        subMessage: 'It can then be discovered, followed and shared with others outside the team',
        menuItems: [
            {
                label: 'Make Public',
                action: makePublic,
                default: true,
            },
            {
                label: 'Cancel',
            },
        ],
    },
    MAKE_PUBLIC_COMPLETE: {
        title: 'Project Live!',
        subMessage: 'Your project is now discoverable<br/>and sharable with others!',
        menuItems: [
            {
                label: 'Copy Link',
                action: () => { const p = get(project); p && p.id && copyProjectLink(p.id); showPrompt(promptIds.MAKE_PUBLIC_COMPLETE_COPIED); },
                default: true,
            },
            {
                label: 'Ok',
            },
        ],
    },
    MAKE_PUBLIC_COMPLETE_COPIED: {
        title: 'Project Live!',
        subMessage: 'Your project is now discoverable<br/>and sharable with others!',
        menuItems: [
            {
                label: 'Link Copied',
                disabled: true,
            },
            {
                label: 'Ok',
            },
        ],
    },

    MAKE_PRIVATE: {
        title: 'Make Private',
        message: 'Make this project private?',
        subMessage: 'It will no longer be visible<br/>to followers and others outside the team',
        menuItems: [
            {
                label: 'Make Private',
                action: makePrivate,
                default: true,
            },
            {
                label: 'Cancel',
            },
        ],
    },
    MAKE_PRIVATE_COMPLETE: {
        title: 'Make Private',
        subMessage: 'Project no longer visible<br/>to followers and non-team members',
        menuItems: [
            {
                label: 'Ok',
            },
        ],
    },

    SHARE_PROJECT: {
        title: 'Share Project',
        message: 'Select copy link below to share this project with others',
        menuItems: [
            {
                label: 'Copy Link',
                action: () => { const p = get(targetProject); p && p.id && copyProjectLink(p.id); showPrompt(promptIds.SHARE_PROJECT_COMPLETE); },
                default: true,
            },
            {
                label: 'Close',
            },
        ],
    },
    SHARE_PROJECT_COMPLETE: {
        title: 'Share Project',
        message: 'Select copy link below to share this project with others',
        menuItems: [
            {
                label: 'Link Copied',
                disabled: true,
            },
            {
                label: 'Close',
            },
        ],
    },

    SHARE_PROFILE: {
        title: 'Share Profile',
        message: 'Select copy link below to share this profile',
        menuItems: [
            {
                label: 'Copy Link',
                action: () => { const p = get(targetUser); p && p.id && copyProfileLink(p.id); showPrompt(promptIds.SHARE_PROFILE_COMPLETE); },
                default: true,
            },
            {
                label: 'Close',
            },
        ],
    },
    SHARE_PROFILE_COMPLETE: {
        title: 'Share Profile',
        message: 'Select copy link below to share this profile',
        menuItems: [
            {
                label: 'Link Copied',
                disabled: true,
            },
            {
                label: 'Close',
            },
        ],
    },

    SHARE_POST: {
        title: 'Share Post',
        message: 'Select copy link below to share this post',
        menuItems: [
            {
                label: 'Copy Link',
                action: () => { const p = get(targetPost); p && p.id && copyPostLink(p.id); showPrompt(promptIds.SHARE_POST_COMPLETE); },
                default: true,
            },
            {
                label: 'Close',
            },
        ],
    },
    SHARE_POST_COMPLETE: {
        title: 'Share Post',
        message: 'Select copy link below to share this post',
        menuItems: [
            {
                label: 'Link Copied',
                disabled: true,
            },
            {
                label: 'Close',
            },
        ],
    },

    SIGN_UP: {
        title: 'Create User',
        menuItems: [
            {
                label: 'Create User',
                disabled: () => !get(signUpFormValidated),
                default: true,
            },
        ],
    },
    SET_ACCOUNT: {
        title: 'Account Details',
        menuItems: [
            {
                label: 'Confirm',
                // label: 'Let\'s Go!',
                disabled: () => !get(setAccountFormValidated),
                default: true,
            },
        ],
    },
    SIGN_UP_EMAIL_EXISTS: {
        title: 'Create User',
        message: 'Email already exists',
        menuItems: [
            {
                label: 'Ok',
                action: () => { showPrompt(promptIds.SIGN_UP); },
            },
        ],
    },
    ACCOUNT_READY: {
        title: 'Welcome!',
        message: 'You\'re all set to discover<br/>and share projects',
        menuItems: [
            {
                label: 'Let\'s Go!',
                default: true,
            },
        ],
    },
    USERNAME_EXISTS: {
        title: 'Sorry',
        message: 'That username already exists',
        allowClose: false,
        menuItems: [
            {
                label: 'Ok',
                action: () => { showPrompt(promptIds.SET_ACCOUNT, {allowClose: false}); },
                // action: () => { showPrompt(promptIds.SIGN_UP); },
            },
        ],
    },
    LOG_IN: {
        title: 'Sign In',
        menuItems: [
            {
                label: 'Sign In',
                disabled: () => !get(logInFormValidated),
                default: true,
            },
        ],
    },
    LOG_IN_ERROR: {
        title: 'Sign In',
        message: 'Invalid username<br />or password',
        menuItems: [
            {
                label: 'Ok',
                action: () => { showPrompt(promptIds.LOG_IN); },
            },
        ],
    },
    LOGGED_OUT: {
        title: 'Logged Out',
        message: 'You\'re now logged out',
        menuItems: [
            {
                label: 'Ok',
            },
        ],
    },
    ADD_PROJECT_ERROR: {
        title: 'New Project',
        message: 'Error adding project',
        menuItems: [
            {
                label: 'Ok',
            },
        ],
    },
}

export default prompts;