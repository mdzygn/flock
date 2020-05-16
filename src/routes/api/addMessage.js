import config from '../../server/config';

import { init, validateCredentials, response, errorResponse, filterItemDetails, catchMongoError, generateId, getConversationUsersId } from '../../server/mongo';

const MAX_PREVIEW_TEXT_LENGTH = 40;

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;

	if (!await validateCredentials(db, options)) {
		response(res, {invalid: true});
		return;
	}

	let details = options.details;
	const newConversation = details.newConversation;

	// console.log('api addMessage', details);

	if (details && (details.message || details.image)) {

		const targetUserIds = details.targetUserIds;
        if (newConversation && !targetUserIds) {
            errorResponse(res, {}, {errorMsg: 'targetUserIds not supplied for newConversation'});
            return;
		}

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
        if (!details.conversationId && !newConversation) {
            errorResponse(res, {}, {errorMsg: 'no conversationId or newConversation specified with message'});
            return;
		}

		const curUser = await db.collection('users').findOne({ id: details.userId });
		if (!curUser) {
            errorResponse(res, {}, {errorMsg: 'user not found'});
            return;
		}

		let curConversation = null;
		let curConversationUserItem = null;

		let newConversationId = null;
		let addedConversation = null;

		if (!newConversation) {
			curConversation = await db.collection('conversations').findOne({ id: details.conversationId });
			if (!curConversation) {
				errorResponse(res, {}, {errorMsg: 'conversation not found'});
				return;
			}
			if (!curConversation.userIds.includes(details.userId)) {
				errorResponse(res, {}, {errorMsg: 'conversation doesn\'t include user'});
				return;
			}
			curConversationUserItem = curConversation.users.find((item) => item.id === details.userId);
			if (!curConversationUserItem) {
				errorResponse(res, {}, {errorMsg: 'conversation doesn\'t include user data'});
				return;
			}
		}

		const lastMessageText = details.message;

		if (lastMessageText && lastMessageText.length > MAX_PREVIEW_TEXT_LENGTH) {
			lastMessageText = lastMessageText.substring(0, MAX_PREVIEW_TEXT_LENGTH);
		}

		if (newConversation) {
			newConversationId = generateId(10);

			// TODO: populate
			const userIds = [details.userId, ...targetUserIds];
			const usersId = getConversationUsersId(userIds);

			const usersFilter = {
				id: { $in: userIds },
			}
			const userResults = await db.collection('users').find(usersFilter).toArray();

			const users = userResults.map((curUser) => {
				const userItem = {
					id: curUser.id,
					loadedAt: details.createdAt,
					viewedAt: details.createdAt,
					username: curUser.username,
					avatarImage: curUser.avatarImage,
					name: curUser.name || curUser.fullName,
				};
				if (!curUser.avatarImage) {
					userItem.style = curUser.style;
				}
				return userItem;
			});

			const conversationDetails = {
				id: newConversationId,
				createdAt: details.createdAt,
				lastMessageAt: details.createdAt,
				lastSenderId: details.userId,
				lastMessageText,

				usersId,
				userIds,
				users,
			};

			// console.log('newConversation', conversationDetails);

			const addConversationResult = await db.collection('conversations').insertOne(conversationDetails);
			if (!addConversationResult) {
				errorResponse(res, {}, {errorMsg: 'conversation could not be added'});
				return;
			} else {
				addedConversation = conversationDetails;
			}
		} else {
			const updateConversationFilter = {
				id: details.conversationId,
				"users.id": details.userId,
			};
			const updateConversationProps = {
				lastMessageAt: details.createdAt,
				lastSenderId: details.userId,
				lastMessageText,
				"users.$.loadedAt" : details.createdAt,
				"users.$.viewedAt" : details.createdAt,
				"users.$.username" : curUser.username,
				"users.$.avatarImage" : curUser.avatarImage,
				"users.$.name" : curUser.name || curUser.fullName,
			};
			if (!curUser.avatarImage) {
				updateConversationProps["users.$.style"] = curUser.style;
			} else if (curConversationUserItem && curConversationUserItem.style) {
				updateConversationProps["users.$.style"] = null;
			}

			let updateConversationResult = await db.collection('conversations').updateOne(updateConversationFilter, {$set: updateConversationProps});
			if (!updateConversationResult) {
				errorResponse(res, {addedMessage: true}, {errorMsg: 'error updating conversation'});
			}
		}

		// db.bar.update({user_id : 123456 , "items.item_name" : "my_item_two" }, {$inc : {"items.$.price" : 1} }, false, true);
		// db.bar.update({user_id : 123456 }, {$addToSet : {"items" : {'item_name' : "my_item_two" , 'price' : 1 }} }, false, true);

		console.log('newConversation', newConversation, 'newConversationId', newConversationId);

		const returnResult = {success: true};
		if (newConversationId) {
			returnResult.conversationId = newConversationId;
			returnResult.conversation = addedConversation;

			details.conversationId = newConversationId;
		}

		let addMessageResult;
		try {
			addMessageResult = await db.collection('messages').insertOne(details);
		} catch (error) {
			catchMongoError(res, error);
			return;
		}

		if (addMessageResult) {
			response(res, returnResult);
		} else {
			errorResponse(res, {}, {errorMsg: 'error adding message'});
		}
	} else {
		errorResponse(res, {}, {errorMsg: 'message or image not provided'});
	}
}