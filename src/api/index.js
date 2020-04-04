import { get } from 'svelte/store';

import { API_PATH } from './config';

import { userId } from '../models/appModel';


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
	  	.then(r => {
			if (r.status >= 200 && r.status < 300) {
				return r;
			  } else {
				var error = new Error(r.statusText || r.status);
				error.response = r;
				return Promise.reject(error);
			  }
		})
		.then(r => r.text())
		.then(json => {
			try {
				return JSON.parse(json);
			} catch (error) {
				error.response = json;
				return Promise.reject(error);
			}
		});
}

/*** Projects ***/

// options = { limit: number, cursor: string, sort: {} }
function getProjects(options) {
	options = options || {};
	options.userId = get(userId);

	return send('getProjects', options).catch(error => {
		console.error('API Error: ' + error, { error });
		return Promise.reject(error); // TODO: prevent followups being called
	});
}

// options = { details: {} }
function addProject(options) {
	return send('addProject', options).catch(error => {
		console.error('API Error: ' + error, { error });
		return Promise.reject(error); // TODO: prevent followups being called
	});
}

// options = { id: string, details: {} }
function updateProject(options) {
	return send('updateProject', options).catch(error => {
		console.error('API Error: ' + error, { error });
		return Promise.reject(error); // TODO: prevent followups being called
	});
}

// options = { details: { userId: id, projectId: id } }
function followProject(options) {
	return send('followProject', options).catch(error => {
		console.error('API Error: ' + error, { error });
		return Promise.reject(error); // TODO: prevent followups being called
	});
}
// options = { details: { userId: id, projectId: id } }
function unfollowProject(options) {
	return send('unfollowProject', options).catch(error => {
		console.error('API Error: ' + error, { error });
		return Promise.reject(error); // TODO: prevent followups being called
	});
}

// options = { details: { userId: id, projectId: id } }
function likeProject(options) {
	return send('likeProject', options).catch(error => {
		console.error('API Error: ' + error, { error });
		return Promise.reject(error); // TODO: prevent followups being called
	});
}
// options = { details: { userId: id, projectId: id } }
function unlikeProject(options) {
	return send('unlikeProject', options).catch(error => {
		console.error('API Error: ' + error, { error });
		return Promise.reject(error); // TODO: prevent followups being called
	});
}

/*** Users ***/

// options = { limit: number, cursor: string, sort: {} }
function getUsers(options) {
	options = options || {};
	options.userId = get(userId);

	return send('getUsers', options).catch(error => {
		console.error('API Error: ' + error, { error });
		return Promise.reject(error); // TODO: prevent followups being called
	});
}

const api = {
	getProjects,
	addProject,
	updateProject,

	followProject,
	unfollowProject,

	likeProject,
	unlikeProject,


	getUsers,
}

export default api;