import api from '../api';

import config from '../config';

import { writable, get } from 'svelte/store';

import loadingRequestUtil from '../utils/loadingRequestUtil';

import MessageModel from '../models/messageModel';

import { userId, usercode, curPath } from '../models/appModel';

import messagesTestData from '../data/messages.json';

export let loadingMessages = writable(false);

let curMessageFilterOptions = null;

let messagesUpdatedHandlers = [];

// let pollStarted = false;
// let curPollMessageTimeout = null;

// let messagesLoadedAt = null;

let messages = writable([]);

// userId.subscribe(updateMessages);
// usercode.subscribe(updateMessages);

// function updateMessages() {
// 	if (get(userId) && get(usercode)) {
// 		const details = { userId: get(userId), getUnviewed: true };
// 		if (messagesLoadedAt) {
// 			details.loadedAt = messagesLoadedAt;
// 		}
// 		getMessages(details);

// 		if (!pollStarted) {
// 			pollStarted = true;
// 			pollMessage();
// 		}
// 	}
// }

// function pollMessage() {
// 	if (typeof window !== 'undefined') {
// 		const curPollDelay = isMessagesPage() ? config.CONVERSATION_POLL_DELAY_ACTIVITY : config.CONVERSATION_POLL_DELAY;

// 		curPollMessageTimeout = window.setTimeout(() => {
// 			// if (document.hasFocus()) {
// 			if (document.visibilityState === 'visible') {
// 				// console.log('poll');
// 				updateMessages();
// 			}
// 			pollMessage();
// 		}, curPollDelay * 1000);
// 	}
// }

// function isMessagesPage() {
// 	const path = get(curPath);
// 	return !!(path && path.match(/messages/));
// }

export function onMessagesUpdated(handler) {
	if (!messagesUpdatedHandlers.includes(handler)) {
		messagesUpdatedHandlers.push(handler);
	}
}

messages.subscribe(() => {
	messagesUpdatedHandlers.forEach(handler => {
		handler();
	});
});

export function loadMessages(options) {
    const messageItems = JSON.parse(JSON.stringify(messagesTestData));
    mergeMessages(messageItems);

	// if (!loadingRequestUtil.isLoading('messages', options)) {
	// 	// console.log('loadMessages', options);
	// 	loadingRequestUtil.setLoading('messages', options, () => { loadingMessages.set(true); });
	// 	api.getMessages(options).then(result => {
	// 		if (!result.error) {
	//			// if (result.loadedAt) {
	//			// 	messagesLoadedAt = result.loadedAt;
	//			// }
	// 			mergeMessages(result.messages);
	// 			loadingRequestUtil.clearLoading('messages', options, () => { loadingMessages.set(false); });
	// 		}
	// 	});
	// }
}

function mergeMessages(newMessages) {
	// console.log('newMessages', newMessages);

	if (newMessages && newMessages.length) {
		const curMessages = get(messages);

		let curMessage, newMessageData, messageId, newMessage;
		for (var messageI = 0; messageI < newMessages.length; messageI++) {
			newMessageData = newMessages[messageI];
			messageId = newMessageData.id;
            curMessage = curMessages.find(match => get(match).id === messageId);
            if (!curMessage) {
                curMessage = MessageModel(newMessageData);
                curMessages.unshift(curMessage);
            } else {
                newMessage = get(curMessage);
                newMessage = Object.assign(newMessage, newMessageData);
                curMessage.set(newMessage);
            }
		}

		curMessages.sort((a,b) => get(b).createdAt - get(a).createdAt ); // sort by reversed created time

		messages.set(curMessages);
	}
}

export function getMessages(options) {
    if (curMessageFilterOptions && options && (
        curMessageFilterOptions.userId !== options.userId
    )) {
        clearFilteredMessages();
    }

    curMessageFilterOptions = JSON.parse(JSON.stringify(options));

    if (curMessageFilterOptions.userId) {
        loadMessages(curMessageFilterOptions);
    }

	return messages;
}

function clearFilteredMessages() {
	const curMessages = get(messages);
	curMessages.length = 0;
	messages.set(curMessages);
}