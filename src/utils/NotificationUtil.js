import NotificationTypes from '../config/NotificationTypes';

export function getNotificationMessage(notification) {
    let message = null;
    if (notification.indirect || notification.notPriority) { // TODO: remove notPriority
        message = '<i>(indirect)</i>';
    } else {
        switch (notification.type) {
            case NotificationTypes.POST_ADDED:
                if (notification.threadId) {
                    if (notification.threadTitle) {
                        message = 'replied in "' + notification.threadTitle + '"';
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