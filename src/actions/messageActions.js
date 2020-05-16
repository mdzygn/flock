// import { get } from 'svelte/store';

import {
    checkLoggedIn,
    loadConversation,
    addAndSetConversation,
} from '../actions/appActions';

import {
    addMessage,
    // setLikeMessage,
    // getMessage,
    // updateMessage,
} from '../models/messagesModel';

export function createMessage(messageDetails) {
    if (!checkLoggedIn()) { return; }

    const result = addMessage(messageDetails);
    result.then((result) => {
        if (result && !result.error) {
            // console.log('createMessage newConversationId', result.conversationId, 'result.conversation', result.conversation);

            if (result.conversation) {
                addAndSetConversation(result.conversation);
            }
            if (result.conversationId) {
                loadConversation(result.conversationId);
            }
        }
    });

    return result;
}

// export function messageToggleLiked(messageId) {
//     if (!checkLoggedIn()) { return; }

//     const targetMessageModel = getMessage(messageId);
//     const targetMessage = get(targetMessageModel);

//     if (targetMessage) {
//         setLikeMessage(targetMessage, !targetMessage.liked);
//         targetMessageModel.set(targetMessage);
//     }
// }

// export function saveMessage(messageDetails) {
//     if (!checkLoggedIn()) { return; }

//     const curMessage = get(message);
//     let result = null;
//     if (curMessage) {
//         result = updateMessage(curMessage, messageDetails);
//         message.set(curMessage);

//         if (curMessage.type === 'thread') {
//             goto('messages/' + curMessage.id);
//         } else {
//             goto('messages/' + curMessage.threadId);
//         }
//         resetScrollRegionPosition('thread');
//     }
//     return result;
// }