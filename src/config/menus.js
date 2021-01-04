export const menuIds = {
    PROJECT_OWNER_MENU: 'PROJECT_OWNER_MENU',
    PROJECT_MENU: 'PROJECT_MENU',
    PROFILE_OWNER_MENU: 'PROFILE_OWNER_MENU',
    PROFILE_MENU: 'PROFILE_MENU',
    MAIN_OPTIONS: 'MAIN_OPTIONS',
    POST_OPTIONS: 'POST_OPTIONS',
    THREAD_POST_OPTIONS: 'THREAD_POST_OPTIONS',
}

import { get } from 'svelte/store';

import promptIds from '../config/promptIds';


import {
    project,
    post,
    userId,
    viewedUser,
    showBetaFeatures,
    getIsProjectTeamMember,
} from '../models/appModel';

import {
    editProjectDetails,
    messageUser,
    showPrompt,
    logOut,
    showTogglePublicDialog,
    editProfile,
    loadProject,
    copyProjectLink,
    copyProfileLink,
    editCurrentPost,
    showDeletePostDialog,
} from '../actions/appActions';

import {
    reportProject,
    projectToggleFollowing,
    unarchiveProject,
} from '../actions/projectActions';

import {
    requestConnection,
    reportUser,
} from '../actions/userActions';

import {
    followPost,
} from '../actions/postActions';


export const menus = {
    PROJECT_OWNER_MENU: {
        menuItems: [
            {
                label: 'Copy Project Link',
                condition: () => { const p = get(project); return !p.archived },
                action: () => { const p = get(project); p && p.id && copyProjectLink(p.id) },
            },
            {
                label: 'Edit Project',
                condition: () => { const p = get(project); return p && !p.archived },
                action: editProjectDetails,
            },
            {
                label: 'Make Private...',
                condition: () => { const p = get(project); return p && p.public && !p.archived },
                action: showTogglePublicDialog,
            },
            {
                label: 'Make Public...',
                condition: () => { const p = get(project); return p && !p.public && !p.archived },
                action: showTogglePublicDialog,
            },
            {
                label: 'Achive Project...',
                condition: () => { const p = get(project); return p && !p.archived },
                action: () => { showPrompt(promptIds.PROJECT_ARCHIVE); },
            },
            {
                label: 'Unarchive Project',
                condition: () => { const p = get(project); return p && p.archived },
                action: () => { const p = get(project); p && p.id && unarchiveProject(p.id) },
            },
        ],
    },
    PROJECT_MENU: {
        menuItems: [
            {
                label: 'Copy Project Link',
                action: () => { const p = get(project); p && p.id && copyProjectLink(p.id) },
            },
            {
                label: 'Follow Project',
                condition: () => { const p = get(project); return p && !p.following },
                action: () => { const p = get(project); p && p.id && projectToggleFollowing(p.id) },
            },
            {
                label: 'Unfollow Project',
                condition: () => { const p = get(project); return p && p.following },
                action: () => { const p = get(project); p && p.id && projectToggleFollowing(p.id) },
            },
            {
                label: () => { const p = get(project); return (p && !p.reported) ? 'Report Project' : 'Project Reported' },
                disabled: () => { const p = get(project); return p && p.reported },
                action: () => { const p = get(project); p && p.id && reportProject(p.id) },
                visible: () => { return get(showBetaFeatures) },
                disabled: true,
            },
        ],
    },
    PROFILE_OWNER_MENU: {
        menuItems: [
            {
                label: 'Copy Profle Link',
                action: () => { const u = get(viewedUser); u && u.id && copyProfileLink(u.id) },
            },
            {
                label: 'Edit Profile',
                action: editProfile,
            },
        ],
    },
    PROFILE_MENU: {
        menuItems: [
            {
                label: 'Copy Profle Link',
                action: () => { const u = get(viewedUser); u && u.id && copyProfileLink(u.id) },
            },
            {
                label: 'Send Message',
                action: () => { const u = get(viewedUser); u && u.id && messageUser(u.id) },
                visible: () => { return get(showBetaFeatures) },
            },
            {
                label: () => { const u = get(viewedUser); return (u && !u.requestedConnection) ? 'Send Connection Request' : 'Connection Request Sent' },
                disabled: () => { const u = get(viewedUser); return u && u.requestedConnection },
                action: () => { const u = get(viewedUser); u && u.id && requestConnection(u.id) },
                visible: () => { return get(showBetaFeatures) },
            },
            {
                label: () => { const u = get(viewedUser); return (u && !u.reported) ? 'Report User' : 'User Reported' },
                disabled: () => { const u = get(viewedUser); return u && u.reported },
                action: () => { const u = get(viewedUser); u && u.id && reportUser(u.id) },
                disabled: true,
                visible: () => { return get(showBetaFeatures) },
            },
        ],
    },
    MAIN_OPTIONS: {
        menuItems: [
            // {
            //     label: 'My Profile',
            //     action: () => { loadProfile(get(userId)) },
            // },
            {
                label: 'About Flock',
                action: () => { loadProject('hPS9cRq2') },
            },
            {
                label: 'Log Out',
                action: logOut,
            },
            // {
            //     label: 'Feedback',
            //     action: () => { loadProject('hPS9cRq2') },
            // },
        ],
    },
    POST_OPTIONS: {
        menuItems: [
            {
                label: 'Edit Post',
                action: editCurrentPost,
            },
            {
                label: 'Delete Post',
                action: showDeletePostDialog,
                // visible: () => { return get(showBetaFeatures) },
                // disabled: true,
            },
            // {
            //     label: 'Report Post',
            //     visible: () => { return get(showBetaFeatures) },
            //     disabled: true,
            // },
        ],
    },
    THREAD_POST_OPTIONS: {
        menuItems: [
            {
                label: 'Edit Post',
                action: editCurrentPost,
                visible: () => {
                    const curPost = get(post);
                    const canEditPost = (curPost && curPost.userId && curPost.userId === get(userId)) || false;
                    return canEditPost;
                    // const curPost = get(post);
                    // return (curPost && curPost.userId && curPost.userId === get(userId)) || false;
                }
            },
            {
                label: 'Delete Post',
                action: showDeletePostDialog,
                visible: () => {
                    // if (!get(showBetaFeatures)) {
                    //     return;
                    // }
                    const curPost = get(post);
                    const canEditPost = (curPost && curPost.userId && curPost.userId === get(userId)) || false;
                    return canEditPost && (!curPost.postCount || curPost.postCount <= 0);
                    // const curPost = get(post);
                    // return (curPost && curPost.userId && curPost.userId === get(userId)) || false;
                    // return get(showBetaFeatures)
                },
                // disabled: true,
            },
            {
                label: () => { const curPost = get(post); return !curPost.following ? 'Follow Post' : 'Unfollow Post' },
                action: () => { const curPost = get(post); !curPost.following ? followPost(curPost.id) : followPost(curPost.id, true) },
                visible: () => {
                    const curPost = get(post);
                    const curProject = get(project);
                    const isTeamMember = (curProject && getIsProjectTeamMember(curProject)) || false;
                    const canEditPost = (curPost && curPost.userId && curPost.userId === get(userId)) || false;
                    return !canEditPost && !isTeamMember;
                    // return (curPost && curPost.userId && curPost.userId !== get(userId)) || false;
                }
            },
            // {
            //     label: 'Report Post',
            //     visible: () => { return get(showBetaFeatures) },
            //     disabled: true,
            // },
        ],
    },
}