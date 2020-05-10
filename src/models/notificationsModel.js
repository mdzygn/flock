import api from '../api';

import config from '../config';

// import { onDestroy } from 'svelte';
import { writable, get } from 'svelte/store';

import loadingRequestUtil from '../utils/loadingRequestUtil';
// import WindowFocusUtil from '../utils/WindowFocusUtil';

import NotificationModel from '../models/notificationModel';

import { userId, usercode, curPath } from '../models/appModel';

export let loadingNotifications = writable(false);

let curNotificationFilterOptions = null;

let notificationsUpdatedHandlers = [];

let pollStarted = false;
let curPollNotificationTimeout = null;

let notificationsLoadedAt = null;

let notifications = writable([]);

export let notificationUnviewedCount = writable(0);

// $: getNotifications({ userId: $userId, getUnviewed: true });

userId.subscribe(updateNotifications);
usercode.subscribe(updateNotifications);

// WindowFocusUtil.focused.subscribe(onWindowFocusUpdated);

function updateNotifications() {
	if (get(userId) && get(usercode)) {
		const details = { userId: get(userId), getUnviewed: true };
		if (notificationsLoadedAt) {
			details.loadedAt = notificationsLoadedAt;
		}
		getNotifications(details);

		if (!pollStarted) {
			pollStarted = true;
			pollNotification();
		}
	}
}

function pollNotification() {
	if (typeof window !== 'undefined') {
		const curPollDelay = isActivityPage() ? config.NOTIFICATION_POLL_DELAY_ACTIVITY : config.NOTIFICATION_POLL_DELAY;

		curPollNotificationTimeout = window.setTimeout(() => {
			// if (document.hasFocus()) {
			if (document.visibilityState === 'visible') {
				// console.log('poll');
				updateNotifications();
			}
			pollNotification();
		}, curPollDelay * 1000);
	}
}

// function onWindowFocusUpdated() {
// 	if (typeof window !== 'undefined') {
// 		if (get(WindowFocusUtil.focused)) {
// 			console.log('ready start polling');
// 			if (pollStarted) {
// 				console.log('start polling');
// 				pollNotification();
// 			}
// 		} else {
// 			console.log('stop polling: ', curPollNotificationTimeout);
// 			if (curPollNotificationTimeout !== null) {
// 				window.clearTimeout(curPollNotificationTimeout);
// 				console.log('clear timeout: ', curPollNotificationTimeout);
// 				curPollNotificationTimeout = null;
// 			}
// 		}
// 	}
// }


function isActivityPage() {
	const path = get(curPath);
	return !!(path && path.match(/activity/));
}

notifications.subscribe(() => {
	const unviewedNotifications = get(notifications).filter(notification => !get(notification).viewed && !get(notification).indirect);
	notificationUnviewedCount.set(unviewedNotifications.length);
	// console.log('notificationUnviewedCount', get(notificationUnviewedCount));
});

// import notificationsData from '../data/notifications.json';
// const notificationItems = JSON.parse(JSON.stringify(notificationsData));
// mergeNotifications(notificationItems);

export function onNotificationsUpdated(handler) {
	if (!notificationsUpdatedHandlers.includes(handler)) {
		notificationsUpdatedHandlers.push(handler);
	}
}

notifications.subscribe(() => {
	notificationsUpdatedHandlers.forEach(handler => {
		handler();
	});
});

export function loadNotifications(options) {
	if (!loadingRequestUtil.isLoading('notifications', options)) {
		// console.log('loadNotifications', options);
		loadingRequestUtil.setLoading('notifications', options, () => { loadingNotifications.set(true); });
		api.getNotifications(options).then(result => {
			if (!result.error) {
				if (result.loadedAt) {
					notificationsLoadedAt = result.loadedAt;
				}
				mergeNotifications(result.notifications);
				loadingRequestUtil.clearLoading('notifications', options, () => { loadingNotifications.set(false); });
			}
		});
	}
}

function mergeNotifications(newNotifications) {
	// console.log('newNotifications', newNotifications);

	if (newNotifications && newNotifications.length) {
		const curNotifications = get(notifications);

		let curNotification, newNotificationData, notificationId, newNotification;
		for (var notificationI = 0; notificationI < newNotifications.length; notificationI++) {
			newNotificationData = newNotifications[notificationI];
			notificationId = newNotificationData.id;
            curNotification = curNotifications.find(match => get(match).id === notificationId);
            if (!curNotification) {
                curNotification = NotificationModel(newNotificationData);
                curNotifications.unshift(curNotification);
            } else {
                newNotification = get(curNotification);
                newNotification = Object.assign(newNotification, newNotificationData);
                curNotification.set(newNotification);
            }
		}

		curNotifications.sort((a,b) => get(b).createdAt - get(a).createdAt ); // sort by reversed created time

		notifications.set(curNotifications);
	}
}

export function getNotifications(options) {
    if (curNotificationFilterOptions && options && (
        curNotificationFilterOptions.userId !== options.userId
    )) {
        clearFilteredNotifications();
    }

    curNotificationFilterOptions = JSON.parse(JSON.stringify(options));

    if (curNotificationFilterOptions.userId) {
        loadNotifications(curNotificationFilterOptions);
    }

	return notifications;
}

function clearFilteredNotifications() {
	const curNotifications = get(notifications);
	curNotifications.length = 0;
	notifications.set(curNotifications);
}

// export function getNotification(notificationId) {
// 	return get(notifications).find(item => get(item).id === notificationId);
// }

export function checkNotificationSeen(details) {
	if (details.postId) {
		const postId = details.postId;
		const notificationModels = get(notifications).filter(itemModel => {
			const item = get(itemModel);
			return !item.viewed && ((item.postId === postId) || (item.threadId === postId));
		});

		const notificationsViewed = [];

		notificationModels.forEach((notificationModel) => {
			const notification = get(notificationModel);
			// console.log('notification before', JSON.parse(JSON.stringify(notification)));

			if (!notification.viewed) {
				notificationsViewed.push(notification.id);
				notification.viewed = true;
				notificationModel.set(notification);

				notifications.set(get(notifications));
			}
		});

		if (notificationsViewed.length) {
			// console.log('update notificationsViewed: ', notificationsViewed);
			const result = api.updateNotifications({ids: notificationsViewed});
			// if (config.DEBUG) {
			// 	result.then((result) => {
			// 		console.log('notifications updated: ', result);
			// 	});
			// }
		}
	}
}

export function setNotificationSeenTimeout(details) {
	let notificationSeenTimeout = null;
	if (typeof window !== 'undefined') {
		notificationSeenTimeout = window.setTimeout(() => {
			checkNotificationSeen(details);
		}, config.ITEM_VIEWED_DELAY * 1000);
	}

	// onDestroy(() => { // doesn't work here?
	// 	clearNotificationSeenTimeout(notificationSeenTimeout);
	// });

	return notificationSeenTimeout;
}

export function clearNotificationSeenTimeout(notificationSeenTimeout) {
	if (notificationSeenTimeout && typeof window !== 'undefined') {
		window.clearTimeout(notificationSeenTimeout);
	}
}