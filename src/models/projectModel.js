import { writable } from 'svelte/store';

const ProjectModel = (projectData) => {
    let initData = {
        id: '',
        slug: '',

        title: '',
        description: '',

        details: null,

        public: false,

        headerImage: null,

        createdAt: 0,
        createdInfo: null,

        lastActiveAt: 0,
        lastActiveInfo: null,

        modifiedAt: 0,

        likeCount: 0,
        followCount: 0,
        unreadCount: 0,

        unreadMessageCount: 0,
        messageCount: 0,

        location: null,

        skills: [],
        links: [],
        team: [],
        tags: [],
        posts: [],
    };
    if (projectData) {
        initData = Object.assign(initData, projectData);
    }
    return writable(initData);
};

export default ProjectModel;