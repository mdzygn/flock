import api from '../api';

import config from '../config';

import EventEmitter from 'eventemitter3';

import { writable, get } from 'svelte/store';

import { generateId } from '../utils';

import loadingRequestUtil from '../utils/loadingRequestUtil';

import MessageModel from '../models/messageModel';

import {
	userId,
	usercode,
	conversation,
	conversationId,
	savingConversationId,
} from '../models/appModel';

import ConversationsModel, {
	addConversation,
	checkConversationSeen,
	removeConversation,
} from '../models/conversationsModel';

// import messagesTestData from '../data/messages.json';

ConversationsModel.on('conversationUpdated', conversationUpdated);

export let loadingMessages = writable(false);

const MessagesModel = new EventEmitter();
export default MessagesModel;

let curMessageFilterOptions = null;

let messagesUpdatedHandlers = [];

// let pollStarted = false;
// let curPollMessageTimeout = null;

// let messagesLoadedAt = null;

let messages = writable(null); // []);

userId.subscribe(onUserChange);
usercode.subscribe(onUserChange);

function onUserChange() {
	clearFilteredMessages();
	// if (!get(userId) || !get(usercode)) {
	// 	clearFilteredMessages();
	// }
	// if (get(userId) && get(usercode)) {
	// 	const details = { userId: get(userId), getUnviewed: true };
	// 	if (messagesLoadedAt) {
	// 		details.loadedAt = messagesLoadedAt;
	// 	}
	// 	getMessages(details);

	// 	if (!pollStarted) {
	// 		pollStarted = true;
	// 		pollMessage();
	// 	}
	// }
}

function conversationUpdated(event) {
	const loadedConversationId = event.conversationId;

	// TODO: preload conversations into different messages
	if (loadedConversationId === get(conversationId)) {
		updateMessages();
	}
}

function updateMessages() {
	getMessages({ conversationId: get(conversationId), getUnloaded: true });
}

// function pollMessage() {
// 	if (typeof window !== 'undefined') {
// 		const curPollDelay = isMessagesPage() ? config.CONVERSATION_POLL_DELAY_FOCUSED : config.CONVERSATION_POLL_DELAY;

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

export function loadMessages(options, callback) {
    // const messageItems = JSON.parse(JSON.stringify(messagesTestData));
    // messageItems.reverse();
    // mergeMessages(messageItems);

	if (!loadingRequestUtil.isLoading('messages', options)) {
		console.log('loadMessages', options);
		loadingRequestUtil.setLoading('messages', options, () => { loadingMessages.set(true); });
		api.getMessages(options).then(result => {
			if (!result.error) {
				// if (result.loadedAt) {
				// 	messagesLoadedAt = result.loadedAt;
				// }
				mergeMessages(result.messages);
				loadingRequestUtil.clearLoading('messages', options, () => { loadingMessages.set(false); });
			} else {
				mergeMessages([]);
			}
			if (callback) {
				callback(result);
			}
		});
	}
}

function mergeMessages(newMessages) {
	// console.log('newMessages', newMessages);

	const origMessages = get(messages);
	const curMessages = origMessages || [];

	if (newMessages && newMessages.length) {
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

		curMessages.sort((a,b) => get(a).createdAt - get(b).createdAt );
		// curMessages.sort((a,b) => get(b).createdAt - get(a).createdAt ); // sort by reversed created time

		let lastMessage = null;
		curMessages.forEach((messageModel) => {
			curMessage = get(messageModel);
			curMessage.lastMessage = lastMessage;
			lastMessage = messageModel;
		});

		messages.set(curMessages);
	} else if (!origMessages) {
		messages.set(curMessages);
	}
}

export function getMessages(options, callback, isNewConversation) {
    if (curMessageFilterOptions && options && (
        curMessageFilterOptions.conversationId !== options.conversationId
    )) {
        clearFilteredMessages();
    }

    curMessageFilterOptions = JSON.parse(JSON.stringify(options));

    if (curMessageFilterOptions.conversationId && !isNewConversation) {
        loadMessages(curMessageFilterOptions, callback);
    }

	return messages;
}

export function getMessage(messageId) {
	const curMessages = get(messages);
	return curMessages && curMessages.find(item => get(item).id === messageId);
}

function clearFilteredMessages() {
	// const curMessages = get(messages);
	// if (curMessages) {
	// 	curMessages.length = 0;
	// }
	const curMessages = null;
	messages.set(curMessages);
}

export function addMessage(messageDetails) {
	const newMessageModel = MessageModel();
	const newMessage = get(newMessageModel);

	const ownerId = get(userId);

	newMessage.id = messageDetails.id;

	newMessage.userId = ownerId;

	newMessage.conversationId = messageDetails.conversationId;

	newMessage.newConversation = messageDetails.newConversation;
	newMessage.targetUserIds = messageDetails.targetUserIds;

	newMessage.message = messageDetails.message || '';
	if (messageDetails.image) {
		newMessage.image = messageDetails.image;
	}

	newMessage.createdAt = (new Date()).getTime(); // use for initial sort values
	newMessage.modifiedAt = newMessage.createdAt;

	// savingMessageId.set(newMessage.id); // need to keep saving message so doesn't override on load
	// savingMessage.set(true);

	// console.log('addMessage', newMessage);

	// console.log('newMessage', newMessage);

	savingConversationId.set(messageDetails.conversationId);

	const result = api.addMessage({details: newMessage});
	result.then(result => {
		if (!result || result.error || result.invalid) {
			console.error(result);
			savingConversationId.set(null);
		} else {
			// updateMessages();
			const result = api.updateConversation({id: get(conversationId)});
			result.then((result) => {
				savingConversationId.set(null);
				return result;
			})
		}

		let curConversationId;
		if (result.conversationId) {
			curConversationId = result.conversationId;
			if (curConversationId !== get(conversationId)) {
				const curConversation = get(conversation);
				console.log('curConversation ', curConversation);
				if (curConversation.isNew) {
					removeConversation(curConversation.id);
				}
			}
		} else {
			curConversationId = get(conversationId);
		}
		console.log('curConversationId : ' + curConversationId, ' result.conversationId: ' + result.conversationId);

		if (curConversationId) {
			getMessages({ conversationId: curConversationId, getUnloaded: true }, onMessagesRetrieved);
			function onMessagesRetrieved() {
				checkConversationSeen({conversationId: get(conversationId)}, true);
			}
		}

		// savingMessage.set(false);
		return result;
	});

	const curMessages = get(messages) || [];
	newMessage.lastMessage = curMessages.length ? curMessages[curMessages.length - 1] : null;

	curMessages.push(newMessageModel);
	messages.set(curMessages);

	if (messageDetails.newConversation) {
		addConversation({id: messageDetails.conversationId});
	} else {
		const curConversation = get(conversation);
		if (curConversation && curConversation.id === newMessage.conversationId) {
			curConversation.lastMessageText = (newMessage.message && newMessage.message.substring(0, config.CONVERSATION_MAX_PREVIEW_LENGTH)) || '';
			curConversation.lastMessageAt = newMessage.createdAt;
			curConversation.lastSenderId = newMessage.userId;
			// conversation.set(curConversation); // dont set as triggers message reloading
		}
	}

	MessagesModel.emit('messagedAdded');

	return result;
}

export function getNewMessageId() {
    let messageId, trialIndex;
	do { messageId = generateId(12); } while (getMessage(messageId) && trialIndex < 99);
	if (trialIndex === 99) { return null; }
	return messageId;
}