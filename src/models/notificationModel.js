import { writable } from 'svelte/store';

const NotificationModel = (notificationData) => {
    let initData = {
        id: '',

        type: '',
        isUserAction: true,

        title: '',
        thumb: null,
        message: null,

        createdAt: 0,

        seen: false,
        viewed: false,

        userId: '',
        username: '',
        userDisplayName: '',

        postId: '',
        threadId: '',
        channelId: '',

        projectId: '',
        projectName: '',
    };

    // "id":"",
    // "type":"postAdded",
    // "isUserAction": true,
    // "title":"",
    // "thumb":"",
    // "message":"",
    // "createdAt":0,
    // "seen": false,
    // "viewed": false,
    // "userId":"sl3p5oms",
    // "postId": "",
    // "threadId": "",
    // "channelId": "",
    // "projectId": ""

    if (notificationData) {
        initData = Object.assign(initData, notificationData);
    }
    return writable(initData);
};

export default NotificationModel;