const projects = [
	{
		title: 'World Creator',
		id: 's7djj2s2',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		image: '',
		createdAt: 0,
		likesCount: 53,
		followingCount: 62,
		unreadCount: 5,

		// returnView: false,
		// showingInfo: false,
		// hasCreated: false,
		following: false,
		isOwner: false,
		isNew: false,
		liked: false,

		location: '',
	},
	{
		title: 'Tesseract',
		id: 'ma9l2h4h',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		image: '',
		createdAt: 0,
		likesCount: 62,
		followingCount: 23,
		unreadCount: 3,
		liked: true,
		location: '',
	},
	{
		title: 'Green Guardians',
		id: 'm2lmad9a',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		image: '',
		createdAt: 0,
		likesCount: 63,
		followingCount: 54,
		unreadCount: 6,
		location: '',
	},
	{
		title: 'Leonardo\'s World',
		id: '36bsf5gs',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		image: '',
		createdAt: 0,
		likesCount: 63,
		followingCount: 54,
		unreadCount: 6,
		location: '',
	},
	{
		title: 'New Earth',
		id: '9dm4l7ps',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		image: '',
		createdAt: 0,
		likesCount: 23,
		followingCount: 45,
		unreadCount: 2,
		liked: true,
		location: '',
		team: [
			'oiv23g46',
			'oiv23g46',
			'oiv23g46',
		],
		skills: [],
		links: [
			{ type: 'website', url: '' },
			{ type: 'patreon', url: '' },
			{ type: 'github', url: '' },
		],
		tags: [],
		posts: [
			'm023ndls',
			'm023ndls',
			'm023ndls',
		]
	},

	// owner example
	{
		title: 'Green Guardians',
		id: 'n4vh55hg',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		image: '',
		createdAt: 0,
		likesCount: 63,
		followingCount: 54,
		unreadCount: 6,
		isOwner: true,
		location: '',
	},

	// following example
	{
		title: 'Leonardo\'s World',
		id: 'msl30nhg',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		image: '',
		createdAt: 0,
		likesCount: 63,
		followingCount: 54,
		following: true,
		unreadCount: 6,
		location: '',
	},
];

// projects.forEach(project => {
// 	project.html = project.html.replace(/^\t{3}/gm, '');
// });

export function getProject(projectId) {
	return projects.find(item => item.id === projectId);
}

export default projects;
