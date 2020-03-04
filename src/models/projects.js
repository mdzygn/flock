const projects = [
	{
		title: 'World Creator',
		slug: 's7djj2s2',
		html: `
			Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.
		`
	},
	{
		title: 'Tesseract',
		slug: 'ma9l2h4h',
		html: `
			Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.
		`
	},
	{
		title: 'Green Guardians',
		slug: 'm2lmad9a',
		html: `
			Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.
		`
	},
	{
		title: 'Leonardo\'s World',
		slug: '9dm4l7ps',
		html: `
			Aliquam sem fringilla ut morbi. In metus vulputate eu scelerisque felis imperdiet proin. Sagittis orci a scelerisque purus semper eget duis.
		`
	},
];

projects.forEach(project => {
	project.html = project.html.replace(/^\t{3}/gm, '');
});

export default projects;
