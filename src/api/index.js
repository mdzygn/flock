let base = (process.env.NODE_ENV === 'development') ? 'http://localhost:3000' : '';//'https://flock-hub.herokuapp.com';
let folder = 'api';

function send(path, options) {
	const fetch = process.browser ? window.fetch : require('node-fetch').default;

	const opts = { method: 'POST', headers: {} };

	if (options) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(options);
	}

	// TODO: use authorization token
	// opts.headers['Authorization'] = `Token ${token}`;

	return fetch(`${base}/${folder}/${path}`, opts)
		.then(r => r.text())
		.then(json => {
			try {
				return JSON.parse(json);
			} catch (err) {
				return json;
			}
		});
}

// function send({ method, path, data, token }) {
// 	const fetch = process.browser ? window.fetch : require('node-fetch').default;

// 	const opts = { method, headers: {} };

// 	if (data) {
// 		opts.headers['Content-Type'] = 'application/json';
// 		opts.body = JSON.stringify(data);
// 	}

// 	if (token) {
// 		opts.headers['Authorization'] = `Token ${token}`;
// 	}

// 	return fetch(`${base}/${folder}/${path}`, opts)
// 		.then(r => r.text())
// 		.then(json => {
// 			try {
// 				return JSON.parse(json);
// 			} catch (err) {
// 				return json;
// 			}
// 		});
// }

// function get(path, token) {
// 	return send({ method: 'GET', path, token });
// }

// function del(path, token) {
// 	return send({ method: 'DELETE', path, token });
// }

// function post(path, data, token) {
// 	return send({ method: 'POST', path, data, token });
// }

// function put(path, data, token) {
// 	return send({ method: 'PUT', path, data, token });
// }

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
	// get,
	// del,
	// post,
	// put,

	getProjects,
	addProject,
	updateProject,

	// likeProject,
	// unlikeProject,
	// followProject,
	// unfollowProject,
}

export default api;