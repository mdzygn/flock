import api from '../api';

import { writable, get } from 'svelte/store';

import ChannelModel from '../models/channelModel';

export let loadingChannels = writable(false);

let channelsUpdatedHandlers = [];
// let tempChannelsUpdatedHandlers = [];

let channels = writable([]);

let filteredChannels = writable([]);

// onChannelsUpdated(channelsUpdated);

import channelsData from '../data/channels.json';
const channelItems = JSON.parse(JSON.stringify(channelsData));
mergeChannels(channelItems);

// export function loadChannels(options) {
// 	if (!get(loadingChannels)) {
// 		loadingChannels.set(true);
// 		api.getChannels(options).then(result => {
// 			mergeChannels(result);
// 			loadingChannels.set(false);
// 		});
// 	}
// }

export function onChannelsUpdated(handler) {
	if (!channelsUpdatedHandlers.includes(handler)) {
		channelsUpdatedHandlers.push(handler);
	}

	//TODO: temp to focus channel set
		channelsUpdatedHandlers.forEach(handler => {
			handler();
		});
}

// export function onTempChannelsUpdated(handler) {
// 	if (!tempChannelsUpdatedHandlers.includes(handler)) {
// 		tempChannelsUpdatedHandlers.push(handler);
// 	}
// }

// channels.subscribe(() => {
// 	channelsUpdatedHandlers.forEach(handler => {
// 		handler();
// 	});

// 	tempChannelsUpdatedHandlers.forEach(handler => {
// 		handler();
// 	});
// 	tempChannelsUpdatedHandlers.length = 0;
// });

function mergeChannels(newChannels) {
	if (newChannels && newChannels.length) {
		const curChannels = get(channels);

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
	const projectId = options && options.projectId;

	if (projectId) {
		const newFilteredChannels = get(channels).filter(channelModel => {
			const channel = get(channelModel);
			return (channel.projectId === projectId);
		});
		filteredChannels.set(newFilteredChannels);
		return filteredChannels;
	} else {
		return channels;
	}
}

export function getChannel(channelId) {
	return get(channels).find(item => get(item).id === channelId);
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
// 			// showPrompt(promptIds.ADD_PROJECT_ERROR);
// 			removeChannelModel(newChannelModel);
// 		}
// 		// newChannel._id = result.insertedId;
// 	});

// 	const curChannels = get(channels);
// 	curChannels.unshift(newChannelModel);
// 	channels.set(curChannels);

// 	return newChannelModel;
// }