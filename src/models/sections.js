export const sections = [
	{
		segment: undefined,
		id: 'home',
		label: 'Home',
		main: true,
	},
	{
		segment: 'discover',
		id: 'discover',
		label: 'Discover',
		main: true,
	},
	{
		segment: 'projects',
		id: 'following',
		label: 'Following',
		main: true,
	},
	{
		segment: 'activity',
		id: 'activity',
		label: 'Activity',
		main: true,
	},
	{
		segment: 'messages',
		id: 'messages',
		label: 'Messages',
		main: true,
	},
	{
		segment: 'message_view',
		id: 'message_view',
		label: 'Mia',
		parentSection: 'messages',
	},
];

export default sections;
