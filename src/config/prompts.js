import { get } from 'svelte/store';


import {
    project,
    targetProject,
    targetUser,
} from '../models/appModel';

// import {
//     copyPageLink,
// } from '../actions/appActions';

import {
    archiveProject,
    copyProjectLink,
} from '../actions/projectActions';

import {
    copyProfileLink,
} from '../actions/userActions';


const prompts = {
    PROJECT_ARCHIVE: {
        title: 'Archive Project',
        message: 'Are you sure you want to archive this project?',
        subMessage: 'It will no longer be editable to team members or visible to followers',
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
    SHARE_PROJECT: {
        title: 'Share Project',
        message: 'Select copy link below to share this project with others',
        menuItems: [
            {
                label: 'Copy Link',
                action: () => { const p = get(targetProject); p && p.id && copyProjectLink(p.id) },
                default: true,
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
                action: () => { const p = get(targetUser); p && p.id && copyProfileLink(p.id) },
                default: true,
            },
            {
                label: 'Close',
            },
        ],
    },
}

export default prompts;