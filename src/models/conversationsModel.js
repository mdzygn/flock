import api from '../api';

import config from '../config';

import { writable, get } from 'svelte/store';

import loadingRequestUtil from '../utils/loadingRequestUtil';

import ConversationModel from '../models/conversationModel';

import { userId, usercode, curPath } from '../models/appModel';

import conversationsTestData from '../data/conversations.json';

export let loadingConversations = writable(false);

let curConversationFilterOptions = null;

let conversationsUpdatedHandlers = [];

let pollStarted = false;
let curPollConversationTimeout = null;

let conversationsLoadedAt = null;

let conversations = writable([]);

export let conversationUnviewedCount = writable(0);

userId.subscribe(updateConversations);
usercode.subscribe(updateConversations);

function updateConversations() {
	if (get(userId) && get(usercode)) {
		const details = { userId: get(userId), getUnviewed: true };
		if (conversationsLoadedAt) {
			details.loadedAt = conversationsLoadedAt;
		}
		getConversations(details);

		if (!pollStarted) {
			pollStarted = true;
			pollConversation();
		}
	}
}

function pollConversation() {
	if (typeof window !== 'undefined') {
		const curPollDelay = isMessagesPage() ? config.CONVERSATION_POLL_DELAY_ACTIVITY : config.CONVERSATION_POLL_DELAY;

		curPollConversationTimeout = window.setTimeout(() => {
			// if (document.hasFocus()) {
			if (document.visibilityState === 'visible') {
				// console.log('poll');
				updateConversations();
			}
			pollConversation();
		}, curPollDelay * 1000);
	}
}

function isMessagesPage() {
	const path = get(curPath);
	return !!(path && path.match(/messages/));
}

conversations.subscribe(() => {
	const unviewedConversations = get(conversations).filter(conversation => !get(conversation).viewed);
	conversationUnviewedCount.set(unviewedConversations.length);
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

export function loadConversations(options) {
    const conversationItems = JSON.parse(JSON.stringify(conversationsTestData));
    mergeConversations(conversationItems);

	// if (!loadingRequestUtil.isLoading('conversations', options)) {
	// 	// console.log('loadConversations', options);
	// 	loadingRequestUtil.setLoading('conversations', options, () => { loadingConversations.set(true); });
	// 	api.getConversations(options).then(result => {
	// 		if (!result.error) {
	// 			if (result.loadedAt) {
	// 				conversationsLoadedAt = result.loadedAt;
	// 			}
	// 			mergeConversations(result.conversations);
	// 			loadingRequestUtil.clearLoading('conversations', options, () => { loadingConversations.set(false); });
	// 		}
	// 	});
	// }
}

function mergeConversations(newConversations) {
	// console.log('newConversations', newConversations);

	if (newConversations && newConversations.length) {
		const curConversations = get(conversations);

		let curConversation, newConversationData, conversationId, newConversation;
		for (var conversationI = 0; conversationI < newConversations.length; conversationI++) {
			newConversationData = newConversations[conversationI];
			conversationId = newConversationData.id;
            curConversation = curConversations.find(match => get(match).id === conversationId);
            if (!curConversation) {
                curConversation = ConversationModel(newConversationData);
                curConversations.unshift(curConversation);
            } else {
                newConversation = get(curConversation);
                newConversation = Object.assign(newConversation, newConversationData);
                curConversation.set(newConversation);
            }
		}

		curConversations.sort((a,b) => get(b).createdAt - get(a).createdAt ); // sort by reversed created time

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

function clearFilteredConversations() {
	const curConversations = get(conversations);
	curConversations.length = 0;
	conversations.set(curConversations);
}

export function checkConversationSeen(details) {
	if (details.postId || details.threadId) {
		const postId = details.postId;
		const threadId = details.threadId;
		const conversationModels = get(conversations).filter(itemModel => {
			const item = get(itemModel);
			return !item.viewed && ((item.postId === postId) || (item.threadId === threadId));
		});

		const conversationsViewed = [];

		conversationModels.forEach((conversationModel) => {
			const conversation = get(conversationModel);
			// console.log('conversation before', JSON.parse(JSON.stringify(conversation)));

			if (!conversation.viewed) {
				conversationsViewed.push(conversation.id);
				conversation.viewed = true;
				conversationModel.set(conversation);

				conversations.set(get(conversations));
			}
		});

		if (conversationsViewed.length) {
			// console.log('update conversationsViewed: ', conversationsViewed);
			const result = api.updateConversations({ids: conversationsViewed});
			// if (config.DEBUG) {
			// 	result.then((result) => {
			// 		console.log('conversations updated: ', result);
			// 	});
			// }
		}
	}
}

export function setConversationSeenTimeout(details, delay) {
	let conversationSeenTimeout = null;
	if (typeof window !== 'undefined') {
		conversationSeenTimeout = window.setTimeout(() => {
			checkConversationSeen(details);
		}, (delay || config.ITEM_VIEWED_DELAY) * 1000);
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