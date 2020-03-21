import { writable } from 'svelte/store';
import { onDestroy } from 'svelte'; // afterUpdate

const projects = [
	{
		title: 'World Creator',
		id: 's7djj2s2',
		slug: 'world-creator',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		projectHasDetails: true,
		public: true,
		image: '',
		createdAt: 0,
		createdInfo: 'created 18 Janurary 2020',
		lastActiveAt: 0,
		lastActiveInfo: 'last activity yesterday 3:40pm',
		likeCount: 53,
		followCount: 62,
		unreadCount: 0,
		unreadMessageCount: 4,
		messageCount: 3,

		following: false,
		isOwner: false,
		isNew: false,
		liked: false,

		location: 'Wellington, New Zealand',
		skills: ['react', 'project management', '3d modelling', 'ui design', 'marketing', 'graphics programming'],

		links: [
			{ type: 'website', url: 'http://www.maginite.com' },
			{ type: 'patreon', url: 'www.patreon.com' },
			{ type: 'github', url: 'www.github.com' },
		],
	},
	{
		title: 'Tesseract',
		id: 'ma9l2h4h',
		slug: 'tesseract',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		projectHasDetails: true,
		public: true,
		image: '',
		createdAt: 0,
		createdInfo: 'created 35 August 2019',
		lastActiveAt: 0,
		lastActiveInfo: 'last activity yesterday 3:40pm',
		likeCount: 62,
		followCount: 23,
		unreadCount: 3,
		unreadMessageCount: 0,
		messageCount: 5,

		liked: true,
		location: 'Wellington, New Zealand',
		skills: ['react', 'project management', '3d modelling', 'ui design', 'marketing', 'graphics programming'],

		links: [
			{ type: 'website', url: 'http://www.maginite.com' },
			{ type: 'patreon', url: 'www.patreon.com' },
		],
	},
	{
		title: 'Green Guardians',
		id: 'm2lmad9a',
		slug: 'green-guardians',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		projectHasDetails: true,
		public: true,
		image: '',
		createdAt: 0,
		createdInfo: 'created 12 July 2019',
		lastActiveAt: 0,
		lastActiveInfo: 'last activity yesterday 3:40pm',
		likeCount: 63,
		followCount: 54,
		unreadCount: 6,
		unreadMessageCount: 3,
		messageCount: 6,

		location: 'Wellington, New Zealand',

		links: [
			{ type: 'website', url: 'http://www.maginite.com' },
			{ type: 'website', url: 'http://www.google.com', label: 'Second Website' },
			{ type: 'patreon', url: 'www.patreon.com' },
			{ type: 'github', url: 'www.github.com' },
		],
	},
	{
		title: 'Leonardo\'s World',
		id: '36bsf5gs',
		slug: 'leonardos-world',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		projectHasDetails: true,
		public: true,
		image: '',
		createdAt: 0,
		lastActiveAt: 0,
		lastActiveInfo: 'last activity yesterday 3:40pm',
		likeCount: 63,
		followCount: 54,
		unreadCount: 6,
		unreadMessageCount: 5,
		messageCount: 3,

		location: 'Wellington, New Zealand',
		skills: ['react', 'project management', '3d modelling', 'ui design', 'marketing', 'graphics programming'],

		links: [
			{ type: 'website', url: 'http://www.maginite.com' },
		],
	},
	{
		title: 'New Earth',
		id: '9dm4l7ps',
		slug: 'new-earth',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		public: true,
		image: '',
		createdAt: 0,
		lastActiveAt: 0,
		lastActiveInfo: 'last activity yesterday 3:40pm',
		likeCount: 23,
		followCount: 45,
		unreadCount: 2,
		unreadMessageCount: 5,
		messageCount: 5,

		liked: true,
		location: 'Wellington, New Zealand',
		skills: ['react', 'project management', '3d modelling', 'ui design', 'marketing', 'graphics programming'],
		team: [
			'oiv23g46',
			'oiv23g46',
			'oiv23g46',
		],
		tags: [],
		posts: [
			'm023ndls',
			'm023ndls',
			'm023ndls',
		],

	},

	// owner example
	{
		title: 'Green Guardians',
		id: 'n4vh55hg',
		slug: 'green-guardians',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		projectHasDetails: true,
		public: false,
		image: '',
		createdAt: 0,
		createdInfo: 'created 18 Janurary 2020',
		lastActiveAt: 0,
		lastActiveInfo: 'last activity yesterday 3:40pm',
		likeCount: 63,
		followCount: 54,
		unreadCount: 3,
		unreadMessageCount: 3,
		messageCount: 6,

		isOwner: true,
		location: 'Wellington, New Zealand',
		skills: ['react', 'project management', '3d modelling', 'ui design', 'marketing', 'graphics programming'],

		links: [
			{ type: 'website', url: 'http://www.maginite.com' },
			{ type: 'github', url: 'www.github.com' },
		],
	},

	// following example
	{
		title: 'Leonardo\'s World',
		id: 'msl30nhg',
		slug: 'leonardos-world',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		projectHasDetails: true,
		public: false,
		image: '',
		createdAt: 0,
		createdInfo: 'created 12 July 2019',
		lastActiveAt: 0,
		lastActiveInfo: 'last activity yesterday 3:40pm',
		likeCount: 63,
		followCount: 54,
		unreadCount: 0,
		unreadMessageCount: 0,
		messageCount: 23,

		following: true,
		location: 'Wellington, New Zealand',
		skills: ['react', 'project management', '3d modelling', 'ui design', 'marketing', 'graphics programming'],

		links: [
			{ type: 'website', url: 'http://www.maginite.com' },
			{ type: 'patreon', url: 'www.patreon.com' },
		],
	},
];

export default projects;