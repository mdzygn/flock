export const sections = [
	{
		segment: undefined,
		id: 'home',
		label: 'Home',
		main: true,
		darkBg: true,
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
	},
	{
		segment: 'messages',
		label: 'Messages',
		main: true,
	},

	{
		segment: 'contacts',
		label: 'Connections',
		showBack: true,
		// parentSection: 'messages',
	},
	{
		segment: 'profile',
		label: 'My Profile',
		darkBg: true,
		showBack: true,
		// parentSection: 'messages',
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
		path: '/projects/.*/messages',
		id: 'projectMessages',
		label: 'Messages',
		showBack: true,
	},
	{
		path: '/projects/.*/followers',
		id: 'projectFollowers',
		label: 'Followers',
		showBack: true,
	},
	{
		path: '/projects/.*/details',
		id: 'create',
		label: 'Details',
		showBack: true,
		// parentSection: 'projects/m62lsp2o/populate',
	},
	{
		path: '/projects/new',
		id: 'newProject',
		label: 'New Project',
		showBack: true,
	},
	// {
	// 	path: '/projects/.*/populate',
	// 	id: 'project',
	// 	label: 'World Creator',
	// 	darkBg: true,
	// 	// showBack: true,
	// 	parentSection: 'projects',
	// },
	// {
	// 	path: '/projects/.*/.*',
	// 	id: 'project',
	// 	label: 'World Creator',
	// 	darkBg: true,
	// 	showBack: true,
	// 	// parentSection: 'projects',
	// },
	{
		path: '/projects/.*',
		id: 'project',
		label: 'World Creator',
		darkBg: true,
		showBack: true,
		isProjectView: true,
		// parentSection: 'discover',
	},

	{
		path: '/channels/.*',
		id: 'channel',
		label: '#Questions',
		showBack: true,
		// parentSection: 'projects/m62lsp2o',
		darkBg: true,
	},
	{
		path: '/threads/.*',
		id: 'thread',
		label: '#Questions',
		showBack: true,
		// parentSection: 'channels/7m2ldksm',
		darkBg: true,
	},

	{
		path: '/messages/group',
		id: 'message_group_view',
		label: 'World Creator',
		showBack: true,
		// parentSection: 'projects/m62lsp2o',
	},
	{
		path: '/messages/.*',
		id: 'message_view',
		label: 'Conversation', // 'Mia',
		showBack: true,
		// parentSection: 'messages',
	},
	{
		path: '/profile/.*/likes',
		id: 'profile_view',
		label: 'Likes',
		darkBg: true,
		showBack: true,
		// parentSection: 'messages',
	},
	{
		path: '/profile/.*',
		id: 'profile_view',
		label: 'User Profile', // 'Sasha Holmer',
		darkBg: true,
		showBack: true,
		// parentSection: 'messages',
	},
];

export const getIdForSection = (section) => {
	return section.id || section.segment;
}

export const getIconForSection = (section) => {
	return section.iconId || getIdForSection(section);
}

export const getPathForSection = (section) => {
	if (section.id === 'home') {
		return '/';
	}
	const sectionId = getIdForSection(section);
	return section.path || '/' + sectionId;
}

export const getMainSectionForSegment = (segment) => {
	const section = getSectionBySegment(segment);
	return getMainSectionForSection(section);
}
export const getMainSectionForRoute = (segment, path) => {
	let section = getSectionByPath(path);
	if (!section || !section.mainSection) {
		section = getSectionBySegment(segment);
	}
	return getMainSectionForSection(section);
}
export const getMainSectionForSection = (section) => {
	if (section) {
		if (section.mainSection !== undefined) {
			return section.mainSection;
		} else {
			return section.segment;
		}
	} else {
		return null;
	}
}

export const isDarkBgForPath = (path) => {
	const section = getSectionByPath(path);
	return (section && section.darkBg) || false;
}

export const getSectionByPath = (path, appState) => {
	if (appState && path === '/discover' && appState.viewMode === 'explore') {
		path = '/explore';
	}
	if (appState && /\/messages\/.*/.test(path) && appState.viewingGroupConversation) {
		path = '/messages/group';
	}
	if (appState && /\/profile\/.*/.test(path) && !/\/profile\/.*\/.*/.test(path) && appState.viewingOwnProfile) {
		path = '/profile';
	}

	return sections.find(item => {
		let sectionPath = getPathForSection(item);
		return new RegExp('^' + sectionPath + '$').test(path)
	});
}

export const getSectionBySegment = (segment) => {
	return sections.find(item => item.segment === segment);
}

export default sections;
