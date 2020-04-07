import { writable } from 'svelte/store';

const PostModel = (postData) => {
    let initData = {
        id: '',

        userId: '',
        channelId: '',
        projectId: '',

        type: '',

        title: '',
        message: null,

        // media: null,

        projectId: '',

        createdAt: 0,

        likeCount: 0,

        postCount: 0,
    };
    if (postData) {
        initData = Object.assign(initData, postData);
    }
    return writable(initData);
};

export default PostModel;