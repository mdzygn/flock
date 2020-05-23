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
	savingConversationId,
	debugOutput,
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
let conversationLoadingTimeout = null;

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

let lastPollTime = (new Date()).getTime();
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
			// console.log('canPoll', canPoll, curPollDelay, lastPollDuration);

			// debugOutput.set(get(debugOutput) + '<br/>' + canPoll + ', ' + get(user) + ', ' + document.visibilityState);

			if (canPoll && get(user) && document.visibilityState !== 'hidden') {
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

export function isConversationPage() {
	const path = get(curPath);
	return !!(path && path.match(/messages\/.+/));
}

conversations.subscribe(() => {
	const curConversations = get(conversations) || [];
	const unviewedConversations = curConversations.filter(conversation => {
		const curConversation = get(conversation);
		if (!isConversationPage() || curConversation.id !== get(conversationId)) { // don't show notification dot if on current conversation with notification (as messages auto load)
			return curConversation ? !curConversation.viewed : false;
		} else {
			return false;
		}
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
		loadingRequestUtil.setLoading('conversations', options, () => {
			if (typeof window !== 'undefined') { // delay timeout to ensure property updates correctly - TODO: shouldn't be needed
				conversationLoadingTimeout = window.setTimeout(() => {
					loadingConversations.set(true);
				}, 0);
			} else {
				loadingConversations.set(true);
			}
		});
		// debugOutput.set(get(debugOutput) + 'get conversation' + '<br/>');
		api.getConversations(options).then(result => {
			if (!result.error) {
				if (result.loadedAt) {
					conversationsLoadedAt = result.loadedAt;
				}
				//debugOutput.set(get(debugOutput) + 'result.conversations ' + result.conversations.length + ', ' + (result.conversations.length) + '<br/>');
				mergeConversations(result.conversations, isInitialLoad);
			}
			if (conversationLoadingTimeout !== null && typeof window !== 'undefined') {
				window.clearTimeout(conversationLoadingTimeout);
				conversationLoadingTimeout = null;
			}
			loadingRequestUtil.clearLoading('conversations', options, () => { loadingConversations.set(false); });
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

	// debugOutput.set(get(debugOutput) + '<br/>newConversations ' + newConversations && newConversations.length);

	if (newConversations && newConversations.length) {
		let curConversation, newConversationData, curConversationId, newConversation;
		for (var conversationI = 0; conversationI < newConversations.length; conversationI++) {
			newConversationData = newConversations[conversationI];
			curConversationId = newConversationData.id;
			if (curConversationId !== get(savingConversationId)) {
				curConversation = curConversations.find(match => get(match).id === curConversationId);

				// console.log('mergeConversation', curConversationId, 'exists', !!curConversation);

				if (!curConversation) {
					curConversation = ConversationModel(newConversationData);
					curConversations.unshift(curConversation);
				} else {
					newConversation = get(curConversation);
					// console.log('lastMessageText', newConversation.lastMessageText);

					newConversation.isNew = false;
					newConversation = Object.assign(newConversation, newConversationData);

					//debugOutput.set(get(debugOutput) + 'merge viewed: ' + newConversation.viewed + ' ' + newConversation.id + '<br/>');

					curConversation.set(newConversation);
				}

				if (!isInitialLoad) { // && curConversationId === get(conversationId)) { // && isConversationPage()) {
					// debugOutput.set(get(debugOutput) + '<br/>conversationUpdated ' + curConversationId);
					ConversationsModel.emit('conversationUpdated', {conversationId: curConversationId});
				}
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


	// debugOutput.set(get(debugOutput) + 'getConversations' + JSON.stringify(curConversationFilterOptions) + '<br/>');

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

// export function checkConversationSeen(details, force) {
// 	if (details.conversationId) {
// 		const curConversationModel = getConversation(details.conversationId);
// 		if (curConversationModel) {
// 			const curConversation = get(curConversationModel);
// 			//debugOutput.set(get(debugOutput) + 'viewed: ' + curConversation.viewed + ' ' + details.conversationId + ' ' + (curConversation.id === get(savingConversationId)) + '<br/>');
// 			if (!curConversation.viewed || force) {
// 				if (curConversation.id !== get(savingConversationId)) {
// 					curConversation.viewed = true;
// 					curConversationModel.set(curConversation);
// 					conversations.set(get(conversations));

// 					//debugOutput.set(get(debugOutput) + 'set viewed' + '<br/>');

// 					// debugOutput.set(get(debugOutput) + '<br/>checkConversationSeen ' + Math.floor(Math.random() * 999) + ': ' + curConversation.id);
// 					// console.log('curConversation set seen', curConversation.id);
// 					const result = api.updateConversation({id: details.conversationId});
// 				}
// 			}
// 		}
// 	}
// }

// export function setConversationSeenTimeout(details, delay) {
// 	let conversationSeenTimeout = null;
// 	if (typeof window !== 'undefined') {
// 		conversationSeenTimeout = window.setTimeout(() => {
// 			checkConversationSeen(details);
// 		}, (delay || config.CONVERSATIION_VIEWED_DELAY) * 1000);
// 	}

// 	// onDestroy(() => { // doesn't work here?
// 	// 	clearConversationSeenTimeout(conversationSeenTimeout);
// 	// });

// 	return conversationSeenTimeout;
// }

// export function clearConversationSeenTimeout(conversationSeenTimeout) {
// 	if (conversationSeenTimeout && typeof window !== 'undefined') {
// 		window.clearTimeout(conversationSeenTimeout);
// 	}
// }

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

export function removeConversation(conversationId) {
	let curConversation = getConversation(conversationId);
	// console.log('curConversation', curConversation);
	if (curConversation) {
		const curConversations = get(conversations) || [];
		const conversationIndex = curConversations.indexOf(curConversation);
		// console.log('conversationIndex', conversationIndex);
		if (conversationIndex !== -1) {
			// console.log('removeConversation', conversationId);
			curConversations.splice(conversationIndex, 1);
			conversations.set(curConversations);
		}
	}
}

export function addConversation(details) {
	const newConversationModel = ConversationModel();
	const newConversationItem = get(newConversationModel);

	// const ownerId = get(userId);

	newConversationItem.id = details.id;
	// newConversationItem.targetUserIds = details.targetUserIds;

	// console.log('addConversation', newConversationItem.id);

	newConversationItem.createdAt = (new Date()).getTime(); // use for initial sort values
	newConversationItem.lastMessageAt = newConversationItem.lastMessageAt;

	newConversationItem.viewed = true;
	newConversationItem.isNew = true;

	const curConversations = get(conversations) || [];
	curConversations.push(newConversationModel);
	conversations.set(curConversations);

	newConversation.set(false);

	ConversationsModel.emit('conversationAdded', {conversationId: details.id});
}

export function updateConversationSeen(conversationId, details) {
	const viewedAt = details.viewedAt;
	console.log('updateConversationSeen', conversationId, 'viewedAt', viewedAt);
	const conversationModel = getConversation(conversationId);
	if (conversationModel) {
		const curConversation = get(conversationModel);
		if (curConversation) {
			// curConversation.viewedAt = viewedAt; // is on user item so not relevant
			curConversation.viewed = true;
			conversationModel.set(curConversation);

			const curConversations = get(conversations) || [];
			conversations.set(curConversations);

			console.log('updateConversationSeen');
		}
	}
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