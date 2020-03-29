export const menuIds = {
    PROJECT_OWNER_MENU: 'PROJECT_OWNER_MENU',
    PROJECT_MENU: 'PROJECT_MENU',
    PROFILE_OWNER_MENU: 'PROFILE_OWNER_MENU',
    PROFILE_MENU: 'PROFILE_MENU',
}

import { get } from 'svelte/store';

import {
    editProjectDetails,
    copyPageLink,
} from '../actions/appActions';

import {
    makePrivate,
    makePublic,
    reportProject,
    projectToggleFollowing,
} from '../actions/projectActions';

import {
    project
} from '../models/appModel';

export const menus = {
    PROJECT_OWNER_MENU: {
        menuItems: [
            {
                label: 'Copy Link',
                // disabled: true,
                action: copyPageLink,
            },
            {
                label: 'Edit Project...',
                condition: () => { const p = get(project); return p && !p.archived },
                action: () => editProjectDetails({editingProject: true}),
            },
            {
                label: 'Make Private',
                condition: () => { const p = get(project); return p && p.public },
                action: makePrivate,
            },
            {
                label: 'Make Public',
                condition: () => { const p = get(project); return p && !p.public && !p.archived },
                action: makePublic,
            },
            {
                label: 'Achive Project',
                condition: () => { const p = get(project); return p && !p.archived },
                disabled: true,
                action: null,
            },
            {
                label: 'Unarchive Project',
                condition: () => { const p = get(project); return p && p.archived },
                disabled: true,
                action: null,
            },
        ],
    },
    PROJECT_MENU: {
        menuItems: [
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
                // label: 'Report Project',
                label: () => { const p = get(project); return (p && !p.reported) ? 'Report Project' : 'Project Reported' },
                disabled: () => { const p = get(project); return p && p.reported },
                action: () => { const p = get(project); reportProject(p) },
                disabled: true,
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