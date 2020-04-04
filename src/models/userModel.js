import { writable } from 'svelte/store';

const UserModel = (userData) => {
    let initData = {
        id: '',

        username: '',

        fullName: '',
        firstName: '',
        lastName: '',

        bio: '',

        skills: [],

        avatarImage: null,
        coverImage: null,

        style: {},

        connected: false, // TODO: move to connection
        requestedConnection: false, // TODO: move to connection

        location: '',

        // postsCount: 0,
        // likesCount: 0,
        // followsCount: 0,

        // projects: [],
    };
    if (userData) {
        initData = Object.assign(initData, userData);
    }
    return writable(initData);
};

export default UserModel;