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
    forgotPasswordFormValidated,
    addTeamMembersFormValidated,
    signInRequired,
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
    deleteCurrentPost,
} from '../actions/appActions';


const prompts = {
    PROJECT_ARCHIVE: {
        title: 'Archive Project',
        message: 'Are you sure you want to<br/>archive this project?',
        subMessage: 'It will no longer be<br/>editable by team members<br/>or visible to any followers',
        showClose: true,
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
        showClose: true,
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
        showClose: true,
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
        showClose: true,
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
        showClose: true,
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
        showClose: true,
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
        showClose: true,
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
        showClose: true,
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
        showClose: true,
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

    DELETE_POST: {
        title: 'Delete Post',
        message: 'Are you sure you want to permanently delete this post?',
        showClose: true,
        menuItems: [
            {
                label: 'Delete Post',
                action: deleteCurrentPost,
                default: true,
            },
            {
                label: 'Cancel',
            },
        ],
    },
    DELETE_POST_PROCESSING: {
        message: 'Deleting Post...',
    },
    DELETE_POST_COMPLETE: {
        title: 'Post Deleted',
        subMessage: 'Post has been removed',
        menuItems: [
            {
                label: 'Ok',
            },
        ],
    },

    SIGN_UP: {
        title: 'Create User',
        showClose: true,
        menuItems: [
            {
                label: 'Create User',
                disabled: () => !get(signUpFormValidated),
                default: true,
            },
            {
                className: 'textPanel',
                prefixText: 'or ',
                label: 'Log In',
                action: () => { showPrompt(promptIds.LOG_IN); },
                visible: () => { return get(signInRequired) },
            },
        ],
    },
    FORGOT_PASSWORD: {
        title: 'Reset Password',
        showClose: true,
        menuItems: [
            {
                label: 'Send Reset Email',
                disabled: () => !get(forgotPasswordFormValidated),
                default: true,
            },
            // {
            //     className: 'textPanel',
            //     prefixText: 'or ',
            //     label: 'Email Support',
            // },
        ],
    },
    FORGOT_PASSWORD_RESET: {
        title: 'Reset Password',
        message: 'An email has been sent this address with instructions to reset your password.<br/><br/>If you can\'t see the email, be sure to check your spam folder,<br/>otherwise please email <a href="mailto:support@flockprojects.com">support@flockprojects.com</a>.',
        menuItems: [
            {
                label: 'Log In',
                default: true,
                action: () => { showPrompt(promptIds.LOG_IN); },
            },
        ],
    },
    FORGOT_PASSWORD_RESET_ERROR: {
        title: 'Reset Password',
        message: 'Error sending password reset.<br/>Please contact <a href="mailto:support@flockprojects.com">support@flockprojects.com</a>.',
        menuItems: [
            {
                label: 'Ok',
            },
        ],
    },
    SET_ACCOUNT: {
        title: 'Set Account Details',
        menuItems: [
            {
                label: 'Confirm',
                // label: 'Let\'s Go!',
                disabled: () => !get(setAccountFormValidated),
                default: true,
            },
        ],
    },
    SET_ACCOUNT_ERROR: {
        title: 'Error',
        message: 'There was an error updating your account details. You may have requested a password reset.',
        menuItems: [
            {
                label: 'Ok',
            },
        ],
    },
    RESET_PASSWORD: {
        title: 'Reset Password',
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
    PASSWORD_RESET: {
        title: 'Password Reset',
        message: 'New password set',
        menuItems: [
            {
                label: 'Ok',
            },
        ],
    },
    LOG_IN: {
        title: 'Sign In',
        showClose: true,
        menuItems: [
            {
                label: 'Sign In',
                disabled: () => !get(logInFormValidated),
                default: true,
            },
            {
                className: 'textPanel demphasisText',
                label: 'Forgot Password',
                action: () => { showPrompt(promptIds.FORGOT_PASSWORD); },
            },
        ],
    },
    LOG_IN_ERROR: {
        title: 'Sign In',
        message: 'Invalid username, email<br />or password',
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
        message: 'Sorry, there was an error creating project.<br />Please try again.',
        menuItems: [
            {
                label: 'Ok',
            },
        ],
    },
    ADD_POST_ERROR: {
        title: 'Error',
        message: 'Sorry, there was an error creating post.<br />Please try again.',
        menuItems: [
            {
                label: 'Ok',
            },
        ],
    },
    SEND_MESSAGE_ERROR: {
        title: 'Error',
        message: 'Sorry, there was an error sending message.<br />Please try again.',
        menuItems: [
            {
                label: 'Ok',
            },
        ],
    },
    INVALID_IMAGE_TYPE_JPG_PNG: {
        title: 'Sorry',
        message: 'Image must be a<br/>jpeg or png file',
        menuItems: [
            {
                label: 'Ok',
            },
        ],
    },
    INVALID_IMAGE_FILESIZE_TOO_LARGE: {
        title: 'Sorry',
        message: 'Image filesize is too large',
        menuItems: [
            {
                label: 'Ok',
            },
        ],
    },
    ADD_TEAM_MEMBERS: {
        title: 'Add Team Members',
        message: 'Team members can view and edit the project, post in team channels and add other members',
        showClose: true,
        menuItems: [
            {
                label: 'Add Members',
                disabled: () => !get(addTeamMembersFormValidated),
                default: true,
            },
        ],
    },
    REMOVE_TEAM_MEMBERS: {
        title: 'Edit Team Members',
        message: 'Remove members from the project by entering their usernames',
        showClose: true,
        menuItems: [
            {
                label: 'Remove Members',
                disabled: () => !get(addTeamMembersFormValidated),
                default: true,
            },
        ],
    },
    EDIT_TEAM_MEMBERS_PROCESSING: {
        message: 'Updating Team...',
    },
    EDIT_TEAM_MEMBERS_ERROR: {
        title: 'Error Updating Team',
        message: 'Error editing team members',
        menuItems: [
            {
                label: 'Ok',
            },
        ],
    },
    EDIT_TEAM_MEMBERS_COMPLETE: {
        title: 'Team Updated',
        message: 'Team members updated',
        menuItems: [
            {
                label: 'Ok',
            },
        ],
    },
    UPDATE_USER_ERROR: {
        title: 'Error',
        message: 'Sorry, there was an error processing your request. Please try again.',
        menuItems: [
            {
                label: 'Ok',
            },
        ],
    },
    SERVER_ERROR: {
        title: 'Error',
        message: 'Sorry, there was an error processing your request. Please try again.',
        menuItems: [
            {
                label: 'Ok',
            },
        ],
    },
    IMAGE_UPLOAD_ERROR: {
        title: 'Upload Error',
        message: 'Sorry, there was an error uploading your image. Please try again.',
        menuItems: [
            {
                label: 'Ok',
            },
        ],
    },
}

export default prompts;