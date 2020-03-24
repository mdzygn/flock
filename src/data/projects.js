const projects = [
	{
		title: 'World Creator',
		id: 's7djj2s2',
		slug: 'world-creator',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		projectHasDetails: true,
		public: true,
		createdAt: 0,
		createdInfo: 'created 18 Janurary 2020',
		lastActiveAt: 0,
		lastActiveInfo: 'last activity yesterday 3:40pm',
		likeCount: 53,
		followCount: 62,
		unreadCount: 0,
		unreadMessageCount: 4,
		messageCount: 3,

		following: true,
		isOwner: true,

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
		createdAt: 0,
		createdInfo: 'created 35 August 2019',
		lastActiveAt: 0,
		lastActiveInfo: 'last activity yesterday 3:40pm',
		likeCount: 62,
		followCount: 23,
		unreadCount: 3,
		unreadMessageCount: 0,
		messageCount: 5,

		following: true,
		isOwner: true,

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
		createdAt: 0,
		lastActiveAt: 0,
		lastActiveInfo: 'last activity yesterday 3:40pm',
		likeCount: 63,
		followCount: 54,
		unreadCount: 6,
		unreadMessageCount: 5,
		messageCount: 3,

		liked: true,

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
		createdAt: 0,
		lastActiveAt: 0,
		lastActiveInfo: 'last activity yesterday 3:40pm',
		likeCount: 23,
		followCount: 45,
		unreadCount: 2,
		unreadMessageCount: 5,
		messageCount: 5,

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

	// owner examples

	{
		title: 'Shared Cafe',
		id: '92kd73kj',
		slug: 'project2',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		projectHasDetails: true,
		public: true,
		createdAt: 0,
		lastActiveAt: 0,
		lastActiveInfo: 'last activity yesterday 3:40pm',
		likeCount: 63,
		followCount: 54,
		unreadCount: 0,
		unreadMessageCount: 5,
		messageCount: 3,

		following: true,
		isOwner: true,

		location: 'Wellington, New Zealand',
		skills: ['react', 'project management', '3d modelling', 'ui design', 'marketing', 'graphics programming'],

		links: [
			{ type: 'website', url: 'http://www.maginite.com' },
			{ type: 'patreon', url: 'www.patreon.com' },
			{ type: 'github', url: 'www.github.com' },
		],
	},

	{
		title: 'Plant Share',
		id: '4v8dtr2k',
		slug: 'project1',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		projectHasDetails: true,
		public: true,
		createdAt: 0,
		lastActiveAt: 0,
		lastActiveInfo: 'last activity yesterday 3:40pm',
		likeCount: 63,
		followCount: 54,
		unreadCount: 2,
		unreadMessageCount: 5,
		messageCount: 3,

		following: true,
		isOwner: true,

		location: 'Wellington, New Zealand',
		skills: ['react', 'project management', '3d modelling', 'ui design', 'marketing', 'graphics programming'],

		links: [
			{ type: 'website', url: 'http://www.maginite.com' },
			{ type: 'patreon', url: 'www.patreon.com' },
			{ type: 'github', url: 'www.github.com' },
		],
	},

	{
		title: 'Aerial Views Book',
		id: 'h9osk2ml',
		slug: 'project6',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		projectHasDetails: true,
		public: true,
		createdAt: 0,
		lastActiveAt: 0,
		lastActiveInfo: 'last activity yesterday 3:40pm',
		likeCount: 63,
		followCount: 54,
		unreadCount: 0,
		unreadMessageCount: 5,
		messageCount: 3,

		following: true,
		isOwner: true,

		location: 'Wellington, New Zealand',
		skills: ['react', 'project management', '3d modelling', 'ui design', 'marketing', 'graphics programming'],

		links: [
			{ type: 'website', url: 'http://www.maginite.com' },
			{ type: 'patreon', url: 'www.patreon.com' },
			{ type: 'github', url: 'www.github.com' },
		],
	},

	// following examples

	{
		title: 'Shared Transport',
		id: 'l4hs7chs',
		slug: 'project3',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		projectHasDetails: true,
		public: true,
		createdAt: 0,
		lastActiveAt: 0,
		lastActiveInfo: 'last activity yesterday 3:40pm',
		likeCount: 63,
		followCount: 54,
		unreadCount: 0,
		unreadMessageCount: 5,
		messageCount: 3,

		following: true,

		location: 'Wellington, New Zealand',
		skills: ['react', 'project management', '3d modelling', 'ui design', 'marketing', 'graphics programming'],

		links: [
			{ type: 'website', url: 'http://www.maginite.com' },
			{ type: 'patreon', url: 'www.patreon.com' },
			{ type: 'github', url: 'www.github.com' },
		],
	},

	{
		title: 'Sweet Treats',
		id: '52kms03l',
		slug: 'project4',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		projectHasDetails: true,
		public: true,
		createdAt: 0,
		lastActiveAt: 0,
		lastActiveInfo: 'last activity yesterday 3:40pm',
		likeCount: 63,
		followCount: 54,
		unreadCount: 3,
		unreadMessageCount: 5,
		messageCount: 3,

		following: true,

		location: 'Wellington, New Zealand',
		skills: ['react', 'project management', '3d modelling', 'ui design', 'marketing', 'graphics programming'],

		links: [
			{ type: 'website', url: 'http://www.maginite.com' },
			{ type: 'patreon', url: 'www.patreon.com' },
			{ type: 'github', url: 'www.github.com' },
		],
	},

	{
		title: 'Architecture Walks',
		id: 'l0soekbs',
		slug: 'project5',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		projectHasDetails: true,
		public: true,
		createdAt: 0,
		lastActiveAt: 0,
		lastActiveInfo: 'last activity yesterday 3:40pm',
		likeCount: 63,
		followCount: 54,
		unreadCount: 5,
		unreadMessageCount: 5,
		messageCount: 3,

		following: true,

		location: 'Wellington, New Zealand',
		skills: ['react', 'project management', '3d modelling', 'ui design', 'marketing', 'graphics programming'],

		links: [
			{ type: 'website', url: 'http://www.maginite.com' },
			{ type: 'patreon', url: 'www.patreon.com' },
			{ type: 'github', url: 'www.github.com' },
		],
	},

	{
		title: 'Holiday Hideaways',
		id: '0dr6yhsa',
		slug: 'project7',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		projectHasDetails: true,
		public: true,
		createdAt: 0,
		lastActiveAt: 0,
		lastActiveInfo: 'last activity yesterday 3:40pm',
		likeCount: 63,
		followCount: 54,
		unreadCount: 0,
		unreadMessageCount: 5,
		messageCount: 3,

		following: true,

		location: 'Wellington, New Zealand',
		skills: ['react', 'project management', '3d modelling', 'ui design', 'marketing', 'graphics programming'],

		links: [
			{ type: 'website', url: 'http://www.maginite.com' },
			{ type: 'patreon', url: 'www.patreon.com' },
			{ type: 'github', url: 'www.github.com' },
		],
	},

	{
		title: 'Antarctic Trust',
		id: 'g3sr9bma',
		slug: 'project8',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		projectHasDetails: true,
		public: true,
		createdAt: 0,
		lastActiveAt: 0,
		lastActiveInfo: 'last activity yesterday 3:40pm',
		likeCount: 63,
		followCount: 54,
		unreadCount: 12,
		unreadMessageCount: 5,
		messageCount: 3,

		following: true,

		location: 'Wellington, New Zealand',
		skills: ['react', 'project management', '3d modelling', 'ui design', 'marketing', 'graphics programming'],

		links: [
			{ type: 'website', url: 'http://www.maginite.com' },
			{ type: 'patreon', url: 'www.patreon.com' },
			{ type: 'github', url: 'www.github.com' },
		],
	},

	{
		title: 'Electric Car Sharing',
		id: '6ksb2dla',
		slug: 'project9',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		projectHasDetails: true,
		public: true,
		createdAt: 0,
		lastActiveAt: 0,
		lastActiveInfo: 'last activity yesterday 3:40pm',
		likeCount: 63,
		followCount: 54,
		unreadCount: 2,
		unreadMessageCount: 5,
		messageCount: 3,

		following: true,

		location: 'Wellington, New Zealand',
		skills: ['react', 'project management', '3d modelling', 'ui design', 'marketing', 'graphics programming'],

		links: [
			{ type: 'website', url: 'http://www.maginite.com' },
			{ type: 'patreon', url: 'www.patreon.com' },
			{ type: 'github', url: 'www.github.com' },
		],
	},

	{
		title: 'Shared Art Spaces',
		id: 'opsncl12',
		slug: 'project10',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		projectHasDetails: true,
		public: true,
		createdAt: 0,
		lastActiveAt: 0,
		lastActiveInfo: 'last activity yesterday 3:40pm',
		likeCount: 63,
		followCount: 54,
		unreadCount: 2,
		unreadMessageCount: 5,
		messageCount: 3,

		following: true,

		location: 'Wellington, New Zealand',
		skills: ['react', 'project management', '3d modelling', 'ui design', 'marketing', 'graphics programming'],

		links: [
			{ type: 'website', url: 'http://www.maginite.com' },
			{ type: 'patreon', url: 'www.patreon.com' },
			{ type: 'github', url: 'www.github.com' },
		],
	},

	{
		title: 'Village Trading',
		id: '72mld013',
		slug: 'project11',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		projectHasDetails: true,
		public: true,
		createdAt: 0,
		lastActiveAt: 0,
		lastActiveInfo: 'last activity yesterday 3:40pm',
		likeCount: 63,
		followCount: 54,
		unreadCount: 0,
		unreadMessageCount: 5,
		messageCount: 3,

		following: true,

		location: 'Wellington, New Zealand',
		skills: ['react', 'project management', '3d modelling', 'ui design', 'marketing', 'graphics programming'],

		links: [
			{ type: 'website', url: 'http://www.maginite.com' },
			{ type: 'patreon', url: 'www.patreon.com' },
			{ type: 'github', url: 'www.github.com' },
		],
	},

	{
		title: 'Cat Daycare',
		id: '1h49osdp',
		slug: 'project12',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		projectHasDetails: true,
		public: true,
		createdAt: 0,
		lastActiveAt: 0,
		lastActiveInfo: 'last activity yesterday 3:40pm',
		likeCount: 63,
		followCount: 54,
		unreadCount: 0,
		unreadMessageCount: 5,
		messageCount: 3,

		following: true,

		location: 'Wellington, New Zealand',
		skills: ['react', 'project management', '3d modelling', 'ui design', 'marketing', 'graphics programming'],

		links: [
			{ type: 'website', url: 'http://www.maginite.com' },
			{ type: 'patreon', url: 'www.patreon.com' },
			{ type: 'github', url: 'www.github.com' },
		],
	},

	{
		title: 'Improved Public Transport',
		id: '9p2md0p3',
		slug: 'project13',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		projectHasDetails: true,
		public: true,
		createdAt: 0,
		lastActiveAt: 0,
		lastActiveInfo: 'last activity yesterday 3:40pm',
		likeCount: 63,
		followCount: 54,
		unreadCount: 2,
		unreadMessageCount: 5,
		messageCount: 3,

		following: true,

		location: 'Wellington, New Zealand',
		skills: ['react', 'project management', '3d modelling', 'ui design', 'marketing', 'graphics programming'],

		links: [
			{ type: 'website', url: 'http://www.maginite.com' },
			{ type: 'patreon', url: 'www.patreon.com' },
			{ type: 'github', url: 'www.github.com' },
		],
	},


	// // owner example
	// {
	// 	title: 'Green Guardians',
	// 	id: 'n4vh55hg',
	// 	slug: 'green-guardians',
	// 	description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
	// 	projectHasDetails: true,
	// 	public: false,
	// 	createdAt: 0,
	// 	createdInfo: 'created 18 Janurary 2020',
	// 	lastActiveAt: 0,
	// 	lastActiveInfo: 'last activity yesterday 3:40pm',
	// 	likeCount: 63,
	// 	followCount: 54,
	// 	unreadCount: 3,
	// 	unreadMessageCount: 3,
	// 	messageCount: 6,

	// 	isOwner: true,
	// 	location: 'Wellington, New Zealand',
	// 	skills: ['react', 'project management', '3d modelling', 'ui design', 'marketing', 'graphics programming'],

	// 	links: [
	// 		{ type: 'website', url: 'http://www.maginite.com' },
	// 		{ type: 'github', url: 'www.github.com' },
	// 	],
	// },

	// // following example
	// {
	// 	title: 'Leonardo\'s World',
	// 	id: 'msl30nhg',
	// 	slug: 'leonardos-world',
	// 	description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
	// 	projectHasDetails: true,
	// 	public: false,
	// 	createdAt: 0,
	// 	createdInfo: 'created 12 July 2019',
	// 	lastActiveAt: 0,
	// 	lastActiveInfo: 'last activity yesterday 3:40pm',
	// 	likeCount: 63,
	// 	followCount: 54,
	// 	unreadCount: 0,
	// 	unreadMessageCount: 0,
	// 	messageCount: 23,

	// 	following: true,
	// 	location: 'Wellington, New Zealand',
	// 	skills: ['react', 'project management', '3d modelling', 'ui design', 'marketing', 'graphics programming'],

	// 	links: [
	// 		{ type: 'website', url: 'http://www.maginite.com' },
	// 		{ type: 'patreon', url: 'www.patreon.com' },
	// 	],
	// },
];

export default projects;