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
		path: '/messages/.*',
		id: 'message_view',
		label: 'Mia',
		parentSection: 'messages',
	},
];

export const getIdForSection = (section) => {
	return section.id || section.segment;
}

export const getIconForSection = (section) => {
	return section.iconId || getIdForSection(section);
}

export const getPathForSection = (section) => {
	return section.path || '/' + getIdForSection(section);
}

export const getMainSectionForSegment = (segment) => {
	const section = getSectionBySegment(segment);
	return section ? (section.mainSection || section.segment) : undefined;
}

export const isDarkBgForSegment = (segment) => {
	const section = getSectionBySegment(segment);
	return section ? section.darkBg : false;
}

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
