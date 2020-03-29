export const menuIds = {
    PROJECT_OWNER_MENU: 'PROJECT_OWNER_MENU',
    PROJECT_MENU: 'PROJECT_MENU',
    PROFILE_OWNER_MENU: 'PROFILE_OWNER_MENU',
    PROFILE_MENU: 'PROFILE_MENU',
}

import { get } from 'svelte/store';

import {
    editProjectDetails,
} from '../actions/appActions';

import {
    makePrivate,
    makePublic,
} from '../actions/projectActions';

import {
    project
} from '../models/appModel';

export const menus = {
    PROJECT_OWNER_MENU: {
        menuItems: [
            {
                label: 'Copy Link',
                disabled: true,
                action: null,
            },
            {
                label: 'Edit Project...',
                // condition: '!isArchived',
                action: () => editProjectDetails({editingProject: true}),
            },
            {
                label: 'Make Private',
                condition: () => { const p = get(project); return p && p.public },
                // condition: 'isPublic',
                action: makePrivate,
            },
            {
                label: 'Make Public',
                condition: () => { const p = get(project); return p && !p.public },
                // condition: '!isPublic && !isArchived',
                action: makePublic,
            },
            {
                label: 'Achive Project',
                // condition: '!isArchived',
                disabled: true,
                action: null,
            },
            // {
            //     label: 'Unarchive Project',
            //     condition: 'isArchived',
            //     disabled: true,
            //     action: null,
            // },
        ],
    },
    PROJECT_MENU: {
        menuItems: [
            {
                label: 'Follow Project',
                // condition: '!isFollowing',
                disabled: true,
                action: null,
            },
            // {
            //     label: 'Unfollow Project',
            //     action: 'followProject',
            //     condition: 'isFollowing',
            //     disabled: true,
            // },
            {
                label: 'Report Project',
                disabled: true,
                action: null,
            },
        ],
    },
    PROFILE_OWNER_MENU: {
        menuItems: [

        ],
    },
    PROFILE_MENU: {
        menuItems: [

        ],
    },
}