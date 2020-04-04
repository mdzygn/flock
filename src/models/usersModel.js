import api from '../api';

import { writable, get } from 'svelte/store';

// import usersData from '../data/users.json';
// const users = JSON.parse(JSON.stringify(usersData));

import UserModel from '../models/userModel';

export let loadingUsers = writable(false);

let users = writable([]);

loadUsers();

export function getUser(userId) {
	return get(users).find(item => get(item).id === userId);
}

export function loadUsers(options) {
	if (!get(loadingUsers)) {
		loadingUsers.set(true);
		api.getUsers(options).then(result => {
			mergeUsers(result);
			loadingUsers.set(false);
		});
	}
}

function mergeUsers(newUsers) {
	if (newUsers && newUsers.length) {
		const curUsers = get(users);

		let curUser, newUserData, userId, newUser;
		for (var userI = 0; userI < newUsers.length; userI++) {
			newUserData = newUsers[userI];
			userId = newUserData.id;
			curUser = curUsers.find(match => get(match).id === userId);
			if (!curUser) {
				curUser = UserModel(newUserData);
				curUsers.unshift(curUser);
				// console.log('add user: ', curUser, newUserData);
			} else {
				// console.log('update existing user: ', curUser, newUserData);
				newUser = get(curUser);
				newUser = Object.assign(newUser, newUserData);
				curUser.set(newUser);
			}
		}

		users.set(curUsers);
	}
}