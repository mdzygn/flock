export const sections = [
	{
		segment: undefined,
		path: '/',
		id: 'home',
		label: 'Home',
		main: true,
	},
	{
		segment: 'discover',
		path: '/discover',
		id: 'discover',
		label: 'Discover',
		main: true,
	},
	{
		segment: 'projects',
		path: '/projects',
		id: 'following',
		label: 'Following',
		main: true,
	},
	{
		segment: 'activity',
		path: '/activity',
		id: 'activity',
		label: 'Activity',
		main: true,
	},
	{
		segment: 'messages',
		path: '/messages',
		id: 'messages',
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

export default sections;
