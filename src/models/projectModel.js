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
        lastActiveAt: 0,

        modifiedAt: 0,

        // likeCount: 0,
        // followCount: 0,

        location: null,

        tags: '',
        skills: '',

        links: [],
        team: [],
        posts: [],
    };
    if (projectData) {
        initData = Object.assign(initData, projectData);
    }
    return writable(initData);
};

export default ProjectModel;