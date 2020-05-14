import { writable } from 'svelte/store';

const MessageModel = (messageData) => {
    let initData = {
        id: null,
        userId: null,
        conversationId: null,

        createdAt: 0,

        message: null,
        // image: null,

        // likes: [],
        // viewed: [],
    };

    if (messageData) {
        initData = Object.assign(initData, messageData);
    }
    return writable(initData);
};

export default MessageModel;