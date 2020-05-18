import api from '../api';

import config from '../config';

import EventEmitter from 'eventemitter3';

import { writable, get } from 'svelte/store';

import { generateId } from '../utils';

import loadingRequestUtil from '../utils/loadingRequestUtil';

import ConversationModel from '../models/conversationModel';

import {
	user,
	userId,
	usercode,
	curPath,
	conversationId,
	conversation,
	newConversation,
} from '../models/appModel';

import PageInteractionUtil from '../utils/PageInteractionUtil';

import conversationsTestData from '../data/conversations.json';
import { strCompare } from '../utils';

export let loadingConversations = writable(false);

let curConversationFilterOptions = null;

let conversationsUpdatedHandlers = [];

let pollStarted = false;
let curPollConversationTimeout = null;

let conversationsLoadedAt = null;

let conversations = writable(null);

const ConversationsModel = new EventEmitter();
export default ConversationsModel;

export let conversationsUnviewedCount = writable(0);

userId.subscribe(updateConversations);
usercode.subscribe(updateConversations);

function updateConversations(options) {
	const isPoll = (options && options.isPoll) || false;
	if (get(userId) && get(usercode)) {
		if (!isPoll) {
			clearFilteredConversations();
		}

		const details = { userId: get(userId), getUnviewed: true };
		if (isPoll && conversationsLoadedAt) {
			details.loadedAt = conversationsLoadedAt;
		}
		getConversations(details);

		if (!pollStarted) {
			pollStarted = true;
			pollConversation();
		}
	} else {
		clearFilteredConversations();
		mergeConversations([]);
	}
}

let lastPollTime = 0;
function pollConversation() {
	if (typeof window !== 'undefined') {
		// const curPollDelay = isMessagesPage() ? config.CONVERSATION_POLL_DELAY_FOCUSED : config.CONVERSATION_POLL_DELAY;
		let curPollDelay = config.CONVERSATION_POLL_DELAY;
		if (!PageInteractionUtil.isActive()) {
			curPollDelay = config.CONVERSATION_POLL_DELAY_IDLE;
		} else if (isMessagesPage()) {
			curPollDelay = config.CONVERSATION_POLL_DELAY_FOCUSED;
		}

		curPollConversationTimeout = window.setTimeout(() => {
			const curTime = (new Date()).getTime();
			const lastPollDuration = (curTime - lastPollTime) / 1000;
			const canPoll = lastPollDuration >= curPollDelay;
			console.log('canPoll', canPoll, curPollDelay, lastPollDuration);
			if (canPoll && get(user) && document.visibilityState === 'visible') {
				updateConversations({isPoll: true});
				lastPollTime = curTime;
			}
			pollConversation();
		}, config.POLL_CHECK_DURATION * 1000);
	}
}

function isMessagesPage() {
	const path = get(curPath);
	return !!(path && path.match(/messages/));
}

// function isConversationPage() {
// 	const path = get(curPath);
// 	return !!(path && path.match(/messages\/.+/));
// }

conversations.subscribe(() => {
	const curConversations = get(conversations) || [];
	const unviewedConversations = curConversations.filter(conversation => {
		const curConversation = get(conversation);
		return curConversation ? !curConversation.viewed : false;
		// const userConversationInfo = getUserConversationInfo(curConversation);
		// return userConversationInfo ? !userConversationInfo.viewed : false;
	});
	conversationsUnviewedCount.set(unviewedConversations.length);
});

export function onConversationsUpdated(handler) {
	if (!conversationsUpdatedHandlers.includes(handler)) {
		conversationsUpdatedHandlers.push(handler);
	}
}

conversations.subscribe(() => {
	conversationsUpdatedHandlers.forEach(handler => {
		handler();
	});
});

export function loadConversations(options, callback) {
    // const conversationItems = JSON.parse(JSON.stringify(conversationsTestData));
	// mergeConversations(conversationItems);

	const isInitialLoad = !options.getUnviewed;

	if (!loadingRequestUtil.isLoading('conversations', options)) {
		// console.log('loadConversations', options);
		loadingRequestUtil.setLoading('conversations', options, () => { loadingConversations.set(true); });
		api.getConversations(options).then(result => {
			if (!result.error) {
				if (result.loadedAt) {
					conversationsLoadedAt = result.loadedAt;
				}
				mergeConversations(result.conversations, isInitialLoad);
				loadingRequestUtil.clearLoading('conversations', options, () => { loadingConversations.set(false); });
			}
			if (callback) {
				callback(result);
			}
		});
	}
}

export function mergeConversations(newConversations, isInitialLoad) {
	// console.log('newConversations', newConversations);

	const origConversations = get(conversations);
	const curConversations = origConversations || [];

	if (newConversations && newConversations.length) {
		let curConversation, newConversationData, curConversationId, newConversation;
		for (var conversationI = 0; conversationI < newConversations.length; conversationI++) {
			newConversationData = newConversations[conversationI];
			curConversationId = newConversationData.id;
            curConversation = curConversations.find(match => get(match).id === curConversationId);
            if (!curConversation) {
                curConversation = ConversationModel(newConversationData);
                curConversations.unshift(curConversation);
            } else {
				newConversation = get(curConversation);
				newConversation.isNew = false;
                newConversation = Object.assign(newConversation, newConversationData);
                curConversation.set(newConversation);
			}

			if (!isInitialLoad) { // && curConversationId === get(conversationId)) { // && isConversationPage()) {
				ConversationsModel.emit('conversationUpdated', {conversationId: curConversationId});
			}
		}

		curConversations.sort((a,b) => get(b).lastMessageAt - get(a).lastMessageAt ); // sort by reversed created time
		// curConversations.sort((a,b) => get(b).createdAt - get(a).createdAt ); // sort by reversed created time

		conversations.set(curConversations);
	} else if (!origConversations) {
		conversations.set(curConversations);
	}
}

export function getConversations(options) {
    if (curConversationFilterOptions && options && (
        curConversationFilterOptions.userId !== options.userId
    )) {
        clearFilteredConversations();
    }

    curConversationFilterOptions = JSON.parse(JSON.stringify(options));

    if (curConversationFilterOptions.userId) {
        loadConversations(curConversationFilterOptions);
    }

	return conversations;
}

export function getConversation(conversationId) {
	const curConversations = get(conversations);
	return curConversations && curConversations.find(item => get(item).id === conversationId);
}

function clearFilteredConversations() {
	// const curConversations = get(conversations);
	// if (curConversations) {
	// 	curConversations.length = 0;
	// }
	if (get(conversation)) {
		conversation.set(null);
	}
	const curConversations = null;
	conversations.set(curConversations);
}

export function checkConversationSeen(details) {
	if (details.conversationId) {
		const curConversationModel = getConversation(details.conversationId);
		if (curConversationModel) {
			const curConversation = get(curConversationModel);
			// console.log('curConversation.viewed', curConversation.viewed);
			if (!curConversation.viewed) {
				curConversation.viewed = true;
				curConversationModel.set(curConversation);

				conversations.set(get(conversations));

				const result = api.updateConversation({id: details.conversationId});
			}
		}
	}
}

export function setConversationSeenTimeout(details, delay) {
	let conversationSeenTimeout = null;
	if (typeof window !== 'undefined') {
		conversationSeenTimeout = window.setTimeout(() => {
			checkConversationSeen(details);
		}, (delay || config.CONVERSATIION_VIEWED_DELAY) * 1000);
	}

	// onDestroy(() => { // doesn't work here?
	// 	clearConversationSeenTimeout(conversationSeenTimeout);
	// });

	return conversationSeenTimeout;
}

export function clearConversationSeenTimeout(conversationSeenTimeout) {
	if (conversationSeenTimeout && typeof window !== 'undefined') {
		window.clearTimeout(conversationSeenTimeout);
	}
}

export function getConversationOtherUser(conversation) {
	let curUser = null;
	if (conversation.users) {
		curUser = conversation.users.find(userItem => userItem.id !== get(userId));
	}
	return curUser;
}

export function getConversationUserById(conversation, userId) {
	let curUser = null;

	if (conversation.users) {
		curUser = conversation.users.find(userItem => userItem.id === userId);
	}
	// console.log('userId', userId, 'curUser', curUser);
	return curUser;
}

export function getUserConversationInfo(conversation) {
	let curUser = null;
	if (conversation.users) {
		curUser = conversation.users.find(userItem => userItem.id === get(userId));
	}
	return curUser;
}

export function addConversation(details, messages) {
	const newConversationModel = ConversationModel();
	const newConversationItem = get(newConversationModel);

	// const ownerId = get(userId);

	newConversationItem.id = details.id;
	// newConversationItem.targetUserIds = details.targetUserIds;

	newConversationItem.createdAt = (new Date()).getTime(); // use for initial sort values
	newConversationItem.lastMessageAt = newConversationItem.lastMessageAt;

	newConversationItem.isNew = true;

	const curConversations = get(conversations) || [];
	curConversations.push(newConversationModel);
	conversations.set(curConversations);

	newConversation.set(false);

	ConversationsModel.emit('conversationAdded', {conversationId: details.id});
}

export function getNewConversationId() {
    let conversationId, trialIndex;
	do { conversationId = generateId(12); } while (getConversation(conversationId) && trialIndex < 99);
	if (trialIndex === 99) { return null; }
	return conversationId;
}

export function getConversationUsersId(targetUserIds) {
	const userIds = [get(userId), ...targetUserIds];
	userIds.sort(); // .sort((a,b) => strCompare(a, b));
	const usersId = userIds.join('-');
	return usersId;
}