import { writable } from 'svelte/store';

const ConversationModel = (conversationData) => {
    let initData = {
        id: '',

        // isGroup: false,
        // title: '',

        // projectId: '',
        // projectTitle: '',

        createdAt: 0,

        lastMessageAt: 0,
        lastSenderId: 0,
        lastMessageText: 0,

        userIds: [],

        users: [],
    };

    if (conversationData) {
        initData = Object.assign(initData, conversationData);
    }
    return writable(initData);
};

export default ConversationModel;