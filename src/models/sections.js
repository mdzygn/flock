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
		parentSection: 'messages',
	},
	{
		segment: 'profile',
		label: 'Sasha Holmer',
		darkBg: true,
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
		path: '/projects/new',
		id: 'project',
		label: 'World Creator',
		darkBg: true,
		parentSection: 'projects',
	},
	{
		path: '/projects/.*',
		id: 'project',
		label: 'World Creator',
		darkBg: true,
		parentSection: 'discover',
	},

	{
		path: '/channels/.*/.*',
		id: 'thread',
		label: '#Questions',
		parentSection: 'channels/7m2ldksm',
		darkBg: true,
	},
	{
		path: '/channels/.*',
		id: 'channel',
		label: '#Questions',
		parentSection: 'projects/m62lsp2o',
		darkBg: true,
	},

	{
		path: '/messages/group',
		id: 'message_group_view',
		label: 'World Creator',
		parentSection: 'projects/m62lsp2o',
	},
	{
		path: '/messages/.*',
		id: 'message_view',
		label: 'Mia',
		parentSection: 'messages',
	},
	{
		path: '/profile/.*',
		id: 'profile_view',
		label: 'Sasha Holmer',
		darkBg: true,
	},

	{
		path: '/create/details',
		id: 'create',
		label: 'World Creator',
	},
	{
		path: '/create',
		id: 'create',
		label: 'New Project',
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
	return section ? (section.mainSection || section.segment) : undefined;
}

export const isDarkBgForPath = (segment) => {
	const section = getSectionByPath(segment);
	return section ? section.darkBg : false;
}
// export const isDarkBgForSegment = (segment) => {
// 	const section = getSectionBySegment(segment);
// 	return section ? section.darkBg : false;
// }

export const getSectionByPath = (path) => {
	return sections.find(item => {
		let sectionPath = getPathForSection(item);
		return new RegExp('^' + sectionPath + '$').test(path)
	});
}

export const getSectionBySegment = (segment) => {
	return sections.find(item => item.segment === segment);
}

export default sections;
