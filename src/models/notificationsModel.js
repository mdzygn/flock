import api from '../api';

import config from '../config';

import { writable, get } from 'svelte/store';

import loadingRequestUtil from '../utils/loadingRequestUtil';

import NotificationModel from '../models/notificationModel';

export let loadingNotifications = writable(false);

let curNotificationFilterOptions = null;

let notificationsUpdatedHandlers = [];

let notifications = writable([]);

// export let notificationUnviewedCount = writable(0);

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
		loadingRequestUtil.setLoading('notifications', options, () => { loadingNotifications.set(true); });
		api.getNotifications(options).then(result => {
			mergeNotifications(result);
			loadingRequestUtil.clearLoading('notifications', options, () => { loadingNotifications.set(false); });
		});
	}
}

function mergeNotifications(newNotifications) {
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

				// notifications.set(get(notifications));
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