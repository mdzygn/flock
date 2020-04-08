export const sections = [
	{
		segment: undefined,
		id: 'home',
		label: 'Home',
		main: true,
		darkBg: true,
		beta: true,
		betaHidden: true,
	},
	{
		segment: 'discover',
		label: 'Discover',
		main: true,
		darkBg: true,
	},
	{
		segment: 'projects',
		iconId: 'following',
		label: 'Projects',
		main: true,
	},
	{
		segment: 'activity',
		label: 'Activity',
		main: true,
		beta: true,
	},
	{
		segment: 'messages',
		label: 'Messages',
		main: true,
		beta: true,
	},

	{
		segment: 'contacts',
		label: 'Connections',
		showBack: true,
		// parentPath: 'messages',
	},
	{
		segment: 'profile',
		label: 'My Profile',
		darkBg: true,
		showBack: true,
		// parentPath: 'messages',
	},
	{
		segment: 'explore',
		path: '/discover.*',
		mainSection: 'discover',
		label: 'Discover',
		darkBg: true,
	},
	{
		segment: 'explore',
		path: '/explore.*',
		mainSection: 'discover',
		label: 'Explore',
		darkBg: true,
	},

	{
		path: '/projects/archive',
		id: 'projectArchive',
		label: 'Archived Projects',
		showBack: true,
	},
	{
		path: '/projects/.+/messages',
		id: 'projectMessages',
		label: 'Messages',
		showBack: true,
	},
	{
		path: '/projects/.+/followers',
		id: 'projectFollowers',
		label: 'Followers',
		showBack: true,
	},
	{
		path: '/projects/.+/details',
		id: 'create',
		label: 'Details',
		showBack: true,
		// parentPath: 'projects/m62lsp2o/populate',
	},
	{
		path: '/projects/new',
		id: 'newProject',
		label: 'New Project',
		showBack: true,
	},
	// {
	// 	path: '/projects/.+/populate',
	// 	id: 'project',
	// 	label: 'World Creator',
	// 	darkBg: true,
	// 	// showBack: true,
	// 	parentPath: 'projects',
	// },
	// {
	// 	path: '/projects/.+/.+',
	// 	id: 'project',
	// 	label: 'World Creator',
	// 	darkBg: true,
	// 	showBack: true,
	// 	// parentPath: 'projects',
	// },
	{
		path: '/projects/.+',
		id: 'project',
		label: '',
		darkBg: true,
		isProjectView: true,
		showBack: true,
		useLastPreProjectPath: true,
		parentPath: 'projects',
		// parentPath: 'discover',
	},

	{
		path: '/channels/.+',
		id: 'channel',
		label: '',
		darkBg: true,
		parentPath: 'projects/[project]',
		// showBack: true,
	},
	{
		path: '/posts/new',
		id: 'new_post',
		label: '',
		showBack: true,
	},
	{
		path: '/posts/.+',
		id: 'posts',
		label: '',
		parentPath: 'channels/[channel]',
		showBack: true,
		darkBg: true,
	},

	{
		path: '/messages/group',
		id: 'message_group_view',
		label: 'Messages',
		showBack: true,
		// parentPath: 'projects/m62lsp2o',
	},
	{
		path: '/messages/.+',
		id: 'message_view',
		label: 'Conversation', // 'Mia',
		showBack: true,
		// parentPath: 'messages',
	},
	{
		path: '/profile/.+/likes',
		id: 'profile_view',
		label: 'Likes',
		darkBg: true,
		showBack: true,
		// parentPath: 'messages',
	},
	{
		path: '/profile/.+',
		id: 'profile_view',
		label: '', // 'Sasha Holmer',
		darkBg: true,
		showBack: true,
		// parentPath: 'messages',
	},
];

export default sections;