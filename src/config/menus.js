export const menuIds = {
    PROJECT_OWNER_MENU: 'PROJECT_OWNER_MENU',
    PROJECT_MENU: 'PROJECT_MENU',
    PROFILE_OWNER_MENU: 'PROFILE_OWNER_MENU',
    PROFILE_MENU: 'PROFILE_MENU',
}

export const menus = {
    PROJECT_OWNER_MENU: {
        menuItems: [
            {
                label: 'Copy Link',
                action: 'projectCopyLink',
                disabled: true,
            },
            {
                label: 'Edit Project...',
                action: 'editProject',
                condition: '!isArchived',
            },
            {
                label: 'Make Private',
                action: 'makePrivate',
                condition: 'isPublic',
            },
            // {
            //     label: 'Make Public',
            //     action: 'makePublic',
            //     condition: '!isPublic && !isArchived',
            // },
            {
                label: 'Achive Project',
                action: 'archiveProject',
                condition: '!isArchived',
                disabled: true,
            },
            // {
            //     label: 'Unarchive Project',
            //     action: 'unarchiveProject',
            //     condition: 'isArchived',
            //     disabled: true,
            // },
        ],
    },
    PROJECT_MENU: {
        menuItems: [
            {
                label: 'Follow Project',
                action: 'followProject',
                condition: '!isFollowing',
                disabled: true,
            },
            // {
            //     label: 'Unfollow Project',
            //     action: 'followProject',
            //     condition: 'isFollowing',
            //     disabled: true,
            // },
            {
                label: 'Report Project',
                action: 'reportProject',
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