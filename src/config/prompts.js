export const promptIds = {
    PROJECT_ARCHIVE: 'PROJECT_ARCHIVE',
    SHARE_PROJECT: 'SHARE_PROJECT',
    SHARE_PROFILE: 'SHARE_PROFILE',
}

import { get } from 'svelte/store';


import {
    project,
} from '../models/appModel';

// import {
//     copyPageLink,
// } from '../actions/appActions';

import {
    archiveProject,
} from '../actions/projectActions';


export const prompts = {
    PROJECT_ARCHIVE: {
        title: 'Archive Project',
        message: 'Are you sure you want to archive this project?',
        subMessage: 'It will no longer be editable to team members or visible to followers',
        menuItems: [
            {
                label: 'Archive Project',
                action: () => { const p = get(project); p && p.id && archiveProject(p.id) },
                default: true,
                // disabled: true,
            },
            {
                label: 'Cancel',
            },
        ],
    },
}