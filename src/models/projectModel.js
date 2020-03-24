const ProjectModel = {
    id: '',
    slug: '',

    title: '',
    description: '',

    projectHasDetails: false,

    public: false,

    headerImage: null,

    createdAt: 0,
    createdInfo: null,

    lastActiveAt: 0,
    lastActiveInfo: null,

    likeCount: 0,
    followCount: 0,
    unreadCount: 0,

    unreadMessageCount: 0,
    messageCount: 0,

    following: true,
    isOwner: true,

    location: null,

    skills: [],
    links: [],
    team: [],
    tags: [],
    posts: [],
};

export default ProjectModel;