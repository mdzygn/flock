import NotificationTypes from '../config/NotificationTypes';

export function getNotificationMessage(notification) {
    let message = null;
    if (notification.notPriority) {
        message = '<i>(indirect)</i>';
    } else {
        switch (notification.type) {
            case NotificationTypes.POST_ADDED:
                if (notification.threadId) {
                    if (notification.threadTitle) {
                        message = 'replied to "' + notification.threadTitle + '"';
                    } else if (notification.channelTitle) {
                        message = 'replied to a post in #' + notification.channelTitle + '';
                    } else {
                        message = 'replied to a post';
                    }
                } else if (notification.channelId) {
                    if (notification.channelTitle) {
                        message = 'added a post to #' + notification.channelTitle + '';
                    } else {
                        message = 'added a post';
                    }
                } else if (notification.projectId) {
                    message = 'posted an update';
                }
                break;
        }
    }
    return message;
}