import { writable } from 'svelte/store';
import { onDestroy } from 'svelte'; // afterUpdate

const projects = [
	{
		title: 'World Creator',
		id: 's7djj2s2',
		slug: 'world-creator',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		projectHasDetails: true,
		image: '',
		createdAt: 0,
		likeCount: 53,
		followCount: 62,
		unreadCount: 5,

		following: false,
		isOwner: false,
		isNew: false,
		liked: false,

		location: 'Wellington, New Zealand',
	},
	{
		title: 'Tesseract',
		id: 'ma9l2h4h',
		slug: 'tesseract',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		image: '',
		createdAt: 0,
		likeCount: 62,
		followCount: 23,
		unreadCount: 3,
		liked: true,
		location: 'Wellington, New Zealand',
	},
	{
		title: 'Green Guardians',
		id: 'm2lmad9a',
		slug: 'green-guardians',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		image: '',
		createdAt: 0,
		likeCount: 63,
		followCount: 54,
		unreadCount: 6,
		location: 'Wellington, New Zealand',
	},
	{
		title: 'Leonardo\'s World',
		id: '36bsf5gs',
		slug: 'leonardos-world',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		image: '',
		createdAt: 0,
		likeCount: 63,
		followCount: 54,
		unreadCount: 6,
		location: 'Wellington, New Zealand',
	},
	{
		title: 'New Earth',
		id: '9dm4l7ps',
		slug: 'new-earth',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		image: '',
		createdAt: 0,
		likeCount: 23,
		followCount: 45,
		unreadCount: 2,
		liked: true,
		location: 'Wellington, New Zealand',
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
		slug: 'green-guardians',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		image: '',
		createdAt: 0,
		likeCount: 63,
		followCount: 54,
		unreadCount: 6,
		isOwner: true,
		location: 'Wellington, New Zealand',
	},

	// following example
	{
		title: 'Leonardo\'s World',
		id: 'msl30nhg',
		slug: 'leonardos-world',
		description: 'Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.',
		image: '',
		createdAt: 0,
		likeCount: 63,
		followCount: 54,
		following: true,
		unreadCount: 6,
		location: 'Wellington, New Zealand',
	},
];

// projects.forEach(project => {
// 	project.html = project.html.replace(/^\t{3}/gm, '');
// });

const projectModels = {};

export function getProjectModel(projectId) {
	let projectModel = projectModels[projectId];
	if (!projectModel) {
		let sourceProjectModel = projects.find(item => item.id === projectId);
		projectModel = writable(sourceProjectModel);
		projectModels[projectId] = projectModel;
	}
	return projectModel;
}

// $project $ operator doesn't work in SSR for dynamically set model
export function linkProject(projectId, updateCallback) {
    const projectModel = getProjectModel(projectId);
    let project, unbindProjectModel = projectModel && projectModel.subscribe(updateCallback);
	onDestroy(e => unbindProjectModel && unbindProjectModel());
	return project;
}

export default projects;
