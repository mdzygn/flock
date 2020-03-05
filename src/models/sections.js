export const sections = [
	{
		segment: undefined,
		id: 'home',
		label: 'Home',
		main: true,
	},
	{
		segment: 'discover',
		label: 'Discover',
		main: true,
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

export const getSectionByPath = (path) => {
	return sections.find(item => {
		let sectionPath = getPathForSection(item);
		return new RegExp('^' + sectionPath + '$').test(path)
	});
}

export default sections;
