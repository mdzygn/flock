import api from '../api';

import { writable, get } from 'svelte/store';

import profileImageColors from '../config/profileImageColors.json';
import coverImageColors from '../config/coverImageColors.json';

import config from '../config';

import { generateId } from '../utils';

import loadingRequestUtil from '../utils/loadingRequestUtil';

// import usersData from '../data/users.json';
// const users = JSON.parse(JSON.stringify(usersData));

import UserModel from '../models/userModel';
import { viewedUser, profileId, getHeaderImage } from './appModel';

export let loadingUsers = writable(false);

let users = writable([]);

let usersUpdatedHandlers = [];

// loadUsers();

export function getUser(userId) {
	let curUser = get(users).find(item => get(item).id === userId);
	if (!curUser) {
		curUser = UserModel( { id: userId } );

		const curUsers = get(users);
		curUsers.unshift(curUser);
		users.set(curUsers);
	}
	return curUser;
}

export function loadUsers(options) {
	if (!loadingRequestUtil.isLoading('users', options)) {
		loadingRequestUtil.setLoading('users', options, () => { loadingUsers.set(true); });
		api.getUsers(options).then(result => {
			mergeUsers(result);
			loadingRequestUtil.clearLoading('users', options, () => { loadingUsers.set(false); });
		});
	}
}

export function loadUsersOfItem(item) {
	if (item && item.userId) {
		loadUsers( { ids: [item.userId] } );
	}
}

export function loadUsersOfItemModels(items) {
	const userItems = [];

	let item, itemModel;
	for (var itemI = 0; itemI < items.length; itemI++) {
		itemModel = items[itemI];
		item = get(itemModel);

		if (item && item.userId && !userItems.includes(item.userId)) {
			userItems.push(item.userId);
		}
	}
	if (userItems.length) {
		loadUsers( { ids: userItems } );
	}
}

export function onUsersUpdated(handler) {
	if (!usersUpdatedHandlers.includes(handler)) {
		usersUpdatedHandlers.push(handler);
	}
}

users.subscribe(() => {
	usersUpdatedHandlers.forEach(handler => {
		handler();
	});
});

export function mergeUsers(newUsers) {
	if (newUsers && newUsers.length) {
		const curUsers = get(users);

		const viewedProfileId = get(profileId);

		// let activeUserId = get(userId);

		let curUser, newUserData, curUserId, newUser;
		for (var userI = 0; userI < newUsers.length; userI++) {
			newUserData = newUsers[userI];
			newUserData.loaded = true;
			curUserId = newUserData.id;
			curUser = curUsers.find(match => get(match).id === curUserId);
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
			if (viewedProfileId && curUserId === viewedProfileId) {
				viewedUser.set(newUser);
			}
			// if (activeUserId && activeUserId === curUserId) {
			// 	user.set(newUser);
			// }
		}

		users.set(curUsers);
	}
}

export function getNewUser() {
	const newUserModel = UserModel();
	const newUser = get(newUserModel);

	newUser.id = generateId();

	randomiseUserProfileImageColor(newUserModel);
	randomiseUserCoverImageColor(newUserModel);

	return newUserModel;
}

export function getUserClone(userModel) {
	const newUser = get(userModel);

	const userCloneModel = writable(null);
	if (newUser) {
		const userClone = JSON.parse(JSON.stringify(newUser));
		userCloneModel.set(userClone);
	}

	return userCloneModel;
}

export function randomiseUserProfileImageColor(userModel) {
	const user = get(userModel);

	const curProfileImageColors = profileImageColors[Math.floor(Math.random() * profileImageColors.length)];

	user.style.profileTop = curProfileImageColors.profileTop;
	user.style.profileBottom = curProfileImageColors.profileBottom;

	userModel.set(user);
}

export function randomiseUserCoverImageColor(userModel) {
	const user = get(userModel);

	const curCoverImageColors = coverImageColors[Math.floor(Math.random() * coverImageColors.length)];

	user.style.coverTop = curCoverImageColors.coverTop;
	user.style.coverBottom = curCoverImageColors.coverBottom;

	userModel.set(user);
}

// export function addUser(newUserModel) {
// 	const newUser = get(newUserModel);

// 	newUser.createdAt = (new Date()).getTime(); // use for initial sort values
// 	newUser.modifiedAt = newUser.createdAt;
// 	newUser.lastActiveAt = newUser.createdAt;

// 	api.addUser({details: newUser}).then(result => {
// 		// newUser._id = result.insertedId;

// 		// TODO: use added item
// 		mergeUsers([newUser]);
// 		setUser(newUser.id);
// 	});

// 	// const curUsers = get(users);
// 	// curUsers.unshift(newUserModel);
// 	// users.set(curUsers);

// 	return newUserModel;
// }

export function getProfileCoverImage(user) {
	if (user && user.coverImage) {
		return getHeaderImage(user.coverImage, true);
		// return (config.contentUrl + config.headerImageLibraryFolder + user.coverImage + config.headerImageExtension);
	}
	return null;
}