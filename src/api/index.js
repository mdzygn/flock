import { API_PATH } from './config';

function send(path, options) {
	const fetch = process.browser ? window.fetch : require('node-fetch').default;

	const opts = { method: 'POST', headers: {} };

	if (options) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(options);
	}

	// TODO: use authorization token
	// opts.headers['Authorization'] = `Token ${token}`;

	return fetch(`${API_PATH}/${path}`, opts)
		.then(r => r.text())
		.then(json => {
			try {
				return JSON.parse(json);
			} catch (err) {
				return json;
			}
		});
}

function getProjects(options) {
	return send('getProjects', options);
}

function addProject(options) {
	return send('addProject', options);
}

function updateProject(options) {
	return send('updateProject', options);
}

const api = {
	getProjects,
	addProject,
	updateProject,

	// likeProject,
	// unlikeProject,
	// followProject,
	// unfollowProject,
}

export default api;