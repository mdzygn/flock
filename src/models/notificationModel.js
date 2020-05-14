import { writable } from 'svelte/store';

const NotificationModel = (notificationData) => {
    let initData = {
        id: '',
        userId: '',

        type: '',
        isUserAction: true,

        title: '',
        thumb: null,
        message: null,

        createdAt: 0,

        // seen: false,
        viewed: false,

        actors: [],

        postId: '',
        threadId: '',
        channelId: '',

        projectId: '',
        projectName: '',
    };

    if (notificationData) {
        initData = Object.assign(initData, notificationData);
    }
    return writable(initData);
};

export default NotificationModel;