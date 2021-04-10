import api from '../api';

import locale from '../locale';

import { writable, get } from 'svelte/store';

import { generateId } from '../utils';

import loadingRequestUtil from '../utils/loadingRequestUtil';

import {
	user,
	userId,
	triggerShowPrompt,
	getIsProjectTeamMember,
} from '../models/appModel';

import ChannelModel from '../models/channelModel';

import promptIds from '../config/promptIds';

export let loadingChannels = writable(false);

let channelsUpdatedHandlers = [];
// let tempChannelsUpdatedHandlers = [];

let curChannelFilterOptions = null;

let channels = writable(null);

let filteredChannels = writable(null);

const baseChannelNames = [
	'general',
	'questions',
	'ideas',
];
const primaryChannelNames = [
	'announcements',
	'general',
];
const teamManagedChannelNames = [
	'announcements',
	'workshop',
];

onChannelsUpdated(channelsUpdated);

// import channelsData from '../data/channels.json';
// const channelItems = JSON.parse(JSON.stringify(channelsData));
// mergeChannels(channelItems);

export function loadChannels(options) {
	if (!loadingRequestUtil.isLoading('channels', options)) {
		loadingRequestUtil.setLoading('channels', options, () => { loadingChannels.set(true); });
	// if (!get(loadingChannels)) {
	// 	loadingChannels.set(true);
		api.getChannels(options).then(result => {
			mergeChannels(result);
			// loadingChannels.set(false);
			loadingRequestUtil.clearLoading('channels', options, () => { loadingChannels.set(false); });
		});
	}
}

export function onChannelsUpdated(handler) {
	if (!channelsUpdatedHandlers.includes(handler)) {
		channelsUpdatedHandlers.push(handler);
	}

	//TODO: temp to focus channel set
		// channelsUpdatedHandlers.forEach(handler => {
		// 	handler();
		// });
}

// export function onTempChannelsUpdated(handler) {
// 	if (!tempChannelsUpdatedHandlers.includes(handler)) {
// 		tempChannelsUpdatedHandlers.push(handler);
// 	}
// }

channels.subscribe(() => {
	channelsUpdatedHandlers.forEach(handler => {
		handler();
	});

	// tempChannelsUpdatedHandlers.forEach(handler => {
	// 	handler();
	// });
	// tempChannelsUpdatedHandlers.length = 0;
});

function mergeChannels(newChannels) {
	if (newChannels && newChannels.length) {
		let curChannels = get(channels);

		if (!curChannels) {
			curChannels = [];
		}

		let curChannel, newChannelData, channelId, newChannel;
		for (var channelI = 0; channelI < newChannels.length; channelI++) {
			newChannelData = newChannels[channelI];
			channelId = newChannelData.id;
			curChannel = curChannels.find(match => get(match).id === channelId);
			if (!curChannel) {
				curChannel = ChannelModel(newChannelData);
				curChannels.push(curChannel);
				// curChannels.unshift(curChannel);
				// console.log('add channel: ', curChannel, newChannelData);
			} else {
				// console.log('update existing channel: ', curChannel, newChannelData);
				newChannel = get(curChannel);
				newChannel = Object.assign(newChannel, newChannelData);
				curChannel.set(newChannel);
			}
		}
		// console.log('update channels: ', curChannels);

		channels.set(curChannels);
	}
}

export function getChannels(options) {
	if (options.id || options.projectId) {
		curChannelFilterOptions = options;

		if (curChannelFilterOptions && options && (curChannelFilterOptions.projectId !== options.projectId)) {
			clearFilteredChannels();
		}
		filterCurrentChannels();

		loadChannels(curChannelFilterOptions);

		// console.log(get(filteredChannels));
	}

	return filteredChannels;
}

export function getDefaultChannel(options) {
	// TODO: get for specific project

	const curChannels = get(channels);
	if (curChannels) {
		return get(channels).find(item => get(item).projectId === options.projectId && get(item).title === 'General'); // TODO: store default channel in a different way
	} else {
		return null;
	}
}

function channelsUpdated() {
	filterCurrentChannels();
}

// export function deletePostFromChannel(channelId, postId) {
// 	const curChannels = get(channels);
// 	let targetChannel = curChannels.find(match => get(match).id === channelId);
// 	if (targetChannel) {
// 		let curChannel = get(targetChannel);
// 		if (curChannel) {
// 			curChannel.postCount--; // not working - not dynamic
// 		}
// 	}
// }

function clearFilteredChannels() {
	const curFilteredChannels = get(filteredChannels);
	curFilteredChannels.length = 0;
	filteredChannels.set(curFilteredChannels);
}

function filterCurrentChannels() {
	const projectId = curChannelFilterOptions && curChannelFilterOptions.projectId;

	let newFilteredChannels = get(channels);
	if (newFilteredChannels) {
		if (projectId) {
			newFilteredChannels = newFilteredChannels.filter(channelModel => {
				const channel = get(channelModel);
				// console.log(channel.title + ', ' + channel.channelId + ', ' + channel.type);
				return channel.projectId === projectId;
			});
		}
		newFilteredChannels.sort((a,b) => get(a).sortIndex - get(b).sortIndex); // sort by reversed created time
		// newFilteredChannels.sort((a,b) => get(b).createdAt - get(a).createdAt); // sort by reversed created time
	}
	filteredChannels.set(newFilteredChannels);
}

// 	const projectId = options && options.projectId;

// 	if (projectId) {
// 		const newFilteredChannels = get(channels).filter(channelModel => {
// 			const channel = get(channelModel);
// 			return (channel.projectId === projectId);
// 		});
// 		filteredChannels.set(newFilteredChannels);
// 		return filteredChannels;
// 	} else {
// 		return channels;
// 	}
// }

export function getChannel(channelId) {
	const curChannels = get(channels);
	if (curChannels) {
		return get(channels).find(item => get(item).id === channelId);
	} else {
		return null;
	}
}

export function addChannel(channelDetails) {
    let channelId, trialIndex;
	do { channelId = generateId(); } while (getChannel(channelId) && trialIndex < 99);
	if (trialIndex === 99) { return null; }

	const newChannelModel = ChannelModel();
	const newChannel = get(newChannelModel);

	const ownerId = get(userId);

	newChannel.id = channelId;

	newChannel.type = channelDetails.type;

	newChannel.projectId = channelDetails.projectId;

	newChannel.title = channelDetails.title || '';
	newChannel.message = channelDetails.message || '';

	newChannel.userId = ownerId;

	newChannel.createdAt = (new Date()).getTime(); // use for initial sort values
	newChannel.modifiedAt = newChannel.createdAt;
	newChannel.lastActiveAt = newChannel.createdAt;

	// console.log('newChannel', newChannel);

	api.addChannel({details: newChannel}).then(result => {
		if (!result || result.error || result.invalid) {
            triggerShowPrompt(promptIds.SERVER_ERROR);
        }
		// newChannel._id = result.insertedId;
	});

	let curChannels = get(channels);
	if (!curChannels) {
		curChannels = [];
	}
	curChannels.unshift(newChannelModel);
	channels.set(curChannels);

	filterCurrentChannels();

	return newChannelModel;
}

export function displayChannelForUser(channel, project) {
	const isTeamMember = get(user) && getIsProjectTeamMember(get(project));
	const projectModel = get(project);
	const following = (projectModel && projectModel.following) || false;
	const channelModel = get(channel);
	return isTeamMember || channelModel.postCount || getIsBaseDisplayChannel(channelModel) || (following && !getIsTeamManagedChannel(channelModel));
}

export function getIsBaseDisplayChannel(channel) {
	return baseChannelNames && baseChannelNames.includes(channel.title.toLowerCase());
}

export function getIsPrimaryChannel(channel) {
	return primaryChannelNames && primaryChannelNames.includes(channel.title.toLowerCase());
}

export function getIsTeamManagedChannel(channel) {
	return teamManagedChannelNames && teamManagedChannelNames.includes(channel.title.toLowerCase());
}

export function getChannelDefaultDescription(channel) {
	return locale.CHANNEL_DESCRIPTIONS[channel.title.toUpperCase()] || null;
}

// export function addChannel(channelDetails) {
//     let channelId, trialIndex;
// 	do { channelId = generateId(); } while (getChannel(channelId) && trialIndex < 99);
// 	if (trialIndex === 99) { return null; }

// 	const newChannelModel = ChannelModel();
// 	const newChannel = get(newChannelModel);

// 	const ownerId = get(userId);

// 	newChannel.id = channelId;

// 	newChannel.headerImage = channelDetails.headerImage || null;
// 	newChannel.title = channelDetails.title || '';
// 	newChannel.description = channelDetails.description || '';

// 	newChannel.createdAt = (new Date()).getTime(); // use for initial sort values
// 	newChannel.modifiedAt = newChannel.createdAt;
// 	newChannel.lastActiveAt = newChannel.createdAt;

// 	newChannel.ownerId = ownerId;
// 	newChannel.team = [ownerId];

// 	newChannel.isNew = true;
// 	newChannel.hasCreated = true;

// 	newChannel.followCount++;
// 	newChannel.likeCount++;

// 	api.addChannel({details: newChannel}).then(result => {
// 		if (!result || result.error || result.invalid) {
// 			// triggerShowPrompt(promptIds.ADD_PROJECT_ERROR);
// 			removeChannelModel(newChannelModel);
// 		}
// 		// newChannel._id = result.insertedId;
// 	});

// 	const curChannels = get(channels);
// 	curChannels.unshift(newChannelModel);
// 	channels.set(curChannels);

// 	return newChannelModel;
// }