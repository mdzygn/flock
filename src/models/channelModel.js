import { writable } from 'svelte/store';

const ChannelModel = (channelData) => {
    let initData = {
        id: '',

        title: '',
        description: null,

        projectId: '',
        userId: '',

        createdAt: 0,
    };
    if (channelData) {
        initData = Object.assign(initData, channelData);
    }
    return writable(initData);
};

export default ChannelModel;