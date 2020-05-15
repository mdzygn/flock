import config from '../../server/config';

import { init, validateCredentials, response, errorResponse, filterItemDetails, catchMongoError } from '../../server/mongo';

const MAX_PREVIEW_TEXT_LENGTH = 40;

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;

	if (!await validateCredentials(db, options)) {
		response(res, {invalid: true});
		return;
	}

	let details = options.details;

	if (details && (details.message || details.image)) {

		const addMessageSchema = {
			id: true,

			userId: true,
            conversationId: true,

			// projectId: true,

			message: true,
            image: true,
		};

		details = filterItemDetails(details, addMessageSchema);

		details.createdAt = (new Date()).getTime();
		details.modifiedAt = details.createdAt;

        if (!details.userId) {
            errorResponse(res, {}, {errorMsg: 'no userId specified with message'});
            return;
        }
        if (!details.conversationId) {
            errorResponse(res, {}, {errorMsg: 'no conversationId specified with message'});
            return;
        }

		let addMessageResult;

		try {
			addMessageResult = await db.collection('messages').insertOne(details);
		} catch (error) {
			catchMongoError(res, error);
			return;
		}

		if (addMessageResult) {
            const lastMessageText = details.message;

            if (lastMessageText && lastMessageText.length > MAX_PREVIEW_TEXT_LENGTH) {
                lastMessageText = lastMessageText.substring(0, MAX_PREVIEW_TEXT_LENGTH);
            }

            const updateConversationFilter = {
                id: details.conversationId,
            };
            const updateConversationProps = {
                lastMessageAt: details.createdAt,
                lastSenderId: details.userId,
                lastMessageText,
            };

            // update current user viewed, lastViewedAt and loadedAt times
            // update other users viewed, lastViewedAt and loadedAt times

            let updateConversationResult = await db.collection('conversations').updateOne(updateConversationFilter, {$set: updateConversationProps});

			if (updateConversationResult) {
                response(res, {success: true});
            } else {
                errorResponse(res, {addedMessage: true}, {errorMsg: 'error updating conversation'});
            }
		} else {
			errorResponse(res, {}, {errorMsg: 'error adding message'});
		}
	} else {
		errorResponse(res, {}, {errorMsg: 'message or image not provided'});
	}
}