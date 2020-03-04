// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

const posts = [
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

posts.forEach(post => {
	post.html = post.html.replace(/^\t{3}/gm, '');
});

export default posts;
