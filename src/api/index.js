import { get } from 'svelte/store';

import { API_PATH, DEBUG } from './config';

import { userId, usercode } from '../models/appModel';


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
		}).then(result => {
			if (DEBUG && result && result.error) {
				console.error('API Error: ', result);
			}
			return result;
		});
}

function addOptions(curOptions, newOptions) {
	curOptions = curOptions || {};
	Object.assign(curOptions, newOptions);
	return curOptions;
}

function addCredentials(curOptions) {
	curOptions = curOptions || {};
	curOptions = addOptions(curOptions, {
		userId: get(userId),
		usercode: get(usercode),
	});
	return curOptions;
}

/*** Projects ***/

// options = { limit: number, cursor: string, sort: {} }
function getProjects(options) {
	options = addOptions(options, {
		userId: get(userId),
	});

	return send('getProjects', options).catch(error => {
		console.error('API Error: ' + error, { error });
		return Promise.reject(error); // TODO: prevent followups being called
	});
}

// options = { details: {} }
function addProject(options) {
	options = addCredentials(options);
	return send('addProject', options).catch(error => {
		console.error('API Error: ' + error, { error });
		return Promise.reject(error); // TODO: prevent followups being called
	});
}

// options = { id: string, details: {} }
function updateProject(options) {
	options = addCredentials(options);
	return send('updateProject', options).catch(error => {
		console.error('API Error: ' + error, { error });
		return Promise.reject(error); // TODO: prevent followups being called
	});
}

// options = { details: { userId: id, projectId: id } }
function followProject(options) {
	options = addCredentials(options);
	return send('followProject', options).catch(error => {
		console.error('API Error: ' + error, { error });
		return Promise.reject(error); // TODO: prevent followups being called
	});
}
// options = { details: { userId: id, projectId: id } }
function unfollowProject(options) {
	options = addCredentials(options);
	return send('unfollowProject', options).catch(error => {
		console.error('API Error: ' + error, { error });
		return Promise.reject(error); // TODO: prevent followups being called
	});
}

// options = { details: { userId: id, projectId: id } }
function likeProject(options) {
	options = addCredentials(options);
	return send('likeProject', options).catch(error => {
		console.error('API Error: ' + error, { error });
		return Promise.reject(error); // TODO: prevent followups being called
	});
}
// options = { details: { userId: id, projectId: id } }
function unlikeProject(options) {
	options = addCredentials(options);
	return send('unlikeProject', options).catch(error => {
		console.error('API Error: ' + error, { error });
		return Promise.reject(error); // TODO: prevent followups being called
	});
}


/*** Users ***/

// options = { details: {} }
function login(options) {
	return send('login', options).catch(error => {
		console.error('API Error: ' + error, { error });
		return Promise.reject(error); // TODO: prevent followups being called
	});
}

// options = { limit: number, cursor: string, sort: {} }
function getUsers(options) {
	options = addOptions(options, {
		userId: get(userId),
	});

	return send('getUsers', options).catch(error => {
		console.error('API Error: ' + error, { error });
		return Promise.reject(error); // TODO: prevent followups being called
	});
}

// options = { details: {} }
function addUser(options) {
	return send('addUser', options).catch(error => {
		console.error('API Error: ' + error, { error });
		return Promise.reject(error); // TODO: prevent followups being called
	});
}

// options = { id: string, details: {} }
function updateUser(options) {
	options = addCredentials(options);
	return send('updateUser', options).catch(error => {
		console.error('API Error: ' + error, { error });
		return Promise.reject(error); // TODO: prevent followups being called
	});
}

/*** Channels ***/

// options = { limit: number, cursor: string, sort: {} }
function getChannels(options) {
	options = addOptions(options, {
		userId: get(userId),
	});

	return send('getChannels', options).catch(error => {
		console.error('API Error: ' + error, { error });
		return Promise.reject(error); // TODO: prevent followups being called
	});
}

/*** Posts ***/

// options = { limit: number, cursor: string, sort: {} }
function getPosts(options) {
	options = addOptions(options, {
		userId: get(userId),
	});

	return send('getPosts', options).catch(error => {
		console.error('API Error: ' + error, { error });
		return Promise.reject(error); // TODO: prevent followups being called
	});
}

// options = { details: {} }
function addPost(options) {
	options = addCredentials(options);
	return send('addPost', options).catch(error => {
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


	login,

	getUsers,
	addUser,
	updateUser,

	getChannels,

	getPosts,
	addPost,
}

export default api;