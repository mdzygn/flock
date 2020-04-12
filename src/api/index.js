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
		})/*.then(result => {
			if (DEBUG && result && result.error) {
				console.error('API Error: ', result);
				// return Promise.reject(result);
			}
			return result;
		});*/
}

function addOptions(curOptions, newOptions) {
	// curOptions = curOptions || {};
	curOptions = curOptions ? Object.assign({}, curOptions) : {};
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
	options = addCredentials(options);
	// options = addOptions(options, {
	// 	userId: get(userId),
	// });

	return send('getProjects', options).then(result => {
		if (DEBUG && result && result.error) {
			console.error('API Error - getProjects: ', result);
		}
		return result;
		// return Promise.reject(error); // TODO: prevent followups being called
	});
}

// options = { details: {} }
function addProject(options) {
	options = addCredentials(options);
	return send('addProject', options).then(result => {
		if (DEBUG && result && result.error) {
			console.error('API Error - addProject: ', result);
		}
		return result;
		// return Promise.reject(error); // TODO: prevent followups being called
	});
}

// options = { id: string, details: {} }
function updateProject(options) {
	options = addCredentials(options);
	return send('updateProject', options).then(result => {
		if (DEBUG && result && result.error) {
			console.error('API Error - updateProject: ', result);
		}
		return result;
		// return Promise.reject(error); // TODO: prevent followups being called
	});
}

// options = { details: { userId: id, projectId: id } }
function followProject(options) {
	options = addCredentials(options);
	return send('followProject', options).then(result => {
		if (DEBUG && result && result.error) {
			console.error('API Error - followProject: ', result);
		}
		return result;
		// return Promise.reject(error); // TODO: prevent followups being called
	});
}
// options = { details: { userId: id, projectId: id } }
function unfollowProject(options) {
	options = addCredentials(options);
	return send('unfollowProject', options).then(result => {
		if (DEBUG && result && result.error) {
			console.error('API Error - unfollowProject: ', result);
		}
		return result;
		// return Promise.reject(error); // TODO: prevent followups being called
	});
}

// options = { details: { userId: id, projectId: id } }
function likeProject(options) {
	options = addCredentials(options);
	return send('likeProject', options).then(result => {
		if (DEBUG && result && result.error) {
			console.error('API Error - likeProject: ', result);
		}
		return result;
		// return Promise.reject(error); // TODO: prevent followups being called
	});
}
// options = { details: { userId: id, projectId: id } }
function unlikeProject(options) {
	options = addCredentials(options);
	return send('unlikeProject', options).then(result => {
		if (DEBUG && result && result.error) {
			console.error('API Error - unlikeProject: ', result);
		}
		return result;
		// return Promise.reject(error); // TODO: prevent followups being called
	});
}


/*** Users ***/

// options = { details: {} }
function login(options) {
	return send('login', options).then(result => {
		if (DEBUG && result && result.error) {
			console.error('API Error - login: ', result);
		}
		return result;
		// return Promise.reject(error); // TODO: prevent followups being called
	});
}

// options = { limit: number, cursor: string, sort: {} }
function getUsers(options) {
	options = addCredentials(options);
	// options = addOptions(options, {
	// 	userId: get(userId),
	// });

	return send('getUsers', options).then(result => {
		if (DEBUG && result && result.error) {
			console.error('API Error - getUsers: ', result);
		}
		return result;
		// return Promise.reject(error); // TODO: prevent followups being called
	});
}

// options = { details: {} }
function addUser(options) {
	return send('addUser', options).then(result => {
		if (DEBUG && result && result.error) {
			console.error('API Error - addUser: ', result);
		}
		return result;
		// return Promise.reject(error); // TODO: prevent followups being called
	});
}

// options = { id: string, details: {} }
function updateUser(options) {
	options = addCredentials(options);
	return send('updateUser', options).then(result => {
		if (DEBUG && result && result.error) {
			console.error('API Error - updateUser: ', result);
		}
		return result;
		// return Promise.reject(error); // TODO: prevent followups being called
	});
}

/*** Channels ***/

// options = { limit: number, cursor: string, sort: {} }
function getChannels(options) {
	options = addCredentials(options);
	// options = addOptions(options, {
	// 	userId: get(userId),
	// });

	return send('getChannels', options).then(result => {
		if (DEBUG && result && result.error) {
			console.error('API Error - getChannels: ', result);
		}
		return result;
		// return Promise.reject(error); // TODO: prevent followups being called
	});
}

/*** Posts ***/

// options = { limit: number, cursor: string, sort: {} }
function getPosts(options) {
	options = addCredentials(options);
	// options = addOptions(options, {
	// 	userId: get(userId),
	// });

	return send('getPosts', options).then(result => {
		if (DEBUG && result && result.error) {
			console.error('API Error - getPosts: ', result);
		}
		return result;
		// return Promise.reject(error); // TODO: prevent followups being called
	});
}

// options = { details: {} }
function addPost(options) {
	options = addCredentials(options);
	return send('addPost', options).then(result => {
		if (DEBUG && result && result.error) {
			console.error('API Error - addPost: ', result);
		}
		return result;
		// return Promise.reject(error); // TODO: prevent followups being called
	});
}

// options = { details: { userId: id, postId: id } }
function likePost(options) {
	options = addCredentials(options);
	return send('likePost', options).then(result => {
		if (DEBUG && result && result.error) {
			console.error('API Error - likePost: ', result);
		}
		return result;
		// return Promise.reject(error); // TODO: prevent followups being called
	});
}
// options = { details: { userId: id, postId: id } }
function unlikePost(options) {
	options = addCredentials(options);
	return send('unlikePost', options).then(result => {
		if (DEBUG && result && result.error) {
			console.error('API Error - unlikePost: ', result);
		}
		return result;
		// return Promise.reject(error); // TODO: prevent followups being called
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

	likePost,
	unlikePost,
}

export default api;