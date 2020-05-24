import { DEBUG } from '../../server/config';

import {
	init,
	response,
	errorResponse,
	validateCredentials,
} from '../../server/mongo';

export async function post(req, res, next) {
    const { db } = await init();

	const options = req.body;

	if (!options.userId) {
		response(res, {messages: []});
		return
	}

	if (!await validateCredentials(db, options)) {
		errorResponse(res, {invalid: true}, {errorMsg: 'invalid credentials'});
		return;
    }

	const conversationId = options && options.conversationId;
	const getUnloaded = options && options.getUnloaded;
	const preload = options && options.preload;
	const userId = options && options.userId;
	// let loadedAt = options && options.loadedAt;

	if (!conversationId) {
		errorResponse(res, {}, {errorMsg: 'conversationId not set'});
		return;
	}

	const curConversation = await db.collection('conversations').findOne({ id: conversationId });
	if (!curConversation) {
		errorResponse(res, {}, {errorMsg: 'conversation not found'});
		return;
	}
	if (!curConversation.userIds.includes(userId)) {
		errorResponse(res, {}, {errorMsg: 'conversation doesn\'t include user'});
		return;
	}

	const filter = {};
	filter.conversationId = conversationId;

	if (getUnloaded) {
		filter.userId = { "$ne": userId };
		filter['loaded'] = {
			"$not": { $in: [userId] }
				// "$elemMatch": {
				// 	userId: true,
				// }
			// }
		};
	}

	const sort = {
		createdAt: 1
	};

    let messages = await db.collection('messages').find(filter).sort(sort).toArray();

	if (messages && messages.length) {
		const messageSet = messages.filter((message) => message.userId !== userId);
		const messageIds = messageSet.map((message) => message.id);

		filter.id = { $in: messageIds };

		// const newValues = {
		// 	"users.$.loadedAt" : loadedTime,
		// };
		const updateAction = {
			'$addToSet': { loaded: userId },
		};

		console.log('newMessages: ' + conversationId + ' ' + userId + ' ' + messages.length);

		// update loaded at time only for current user
		const messageUpdateResult = db.collection('messages').updateMany(filter, updateAction);
	}

	let viewedAtTime = null;
	if (!preload) {
		viewedAtTime = (new Date()).getTime();

		const conversationsFilter = {
			id: conversationId,
			"users.id": userId,
		};
		const newValues = {
			"users.$.viewedAt" : viewedAtTime,
		};

		console.log('getMessages ' + conversationId + ' ' + userId + ' viewedAtTime: ' + viewedAtTime);

		const conversationUpdateResult = await db.collection('conversations').updateMany(conversationsFilter, { $set: newValues });
		if (!conversationUpdateResult) {
			errorResponse(res, {}, {errorMsg: 'can\'t update conversation(s)', errorObject: conversationUpdateResult});
		}
	}

	// const session = client.startSession();
	// const transactionOptions = {
	// 	readPreference: 'primary',
	// 	readConcern: { level: 'local' },
	// 	writeConcern: { w: 'majority' }
	// };

	// try {
	// 	const transactionResults = await session.withTransaction(async () => {
	// 		const usersUpdateResults = await usersCollection.updateOne(
	// 			{ email: userEmail },
	// 			{ $addToSet: { reservations: reservation } },
	// 			{ session });
	// 		console.log(`${usersUpdateResults.matchedCount} document(s) found in the users collection with the email address ${userEmail}.`);
	// 		console.log(`${usersUpdateResults.modifiedCount} document(s) was/were updated to include the reservation.`);

	// 		const isListingReservedResults = await listingsAndReviewsCollection.findOne(
	// 			{ name: nameOfListing, datesReserved: { $in: reservationDates } },
	// 			{ session });
	// 		if (isListingReservedResults) {
	// 			await session.abortTransaction();
	// 			console.error("This listing is already reserved for at least one of the given dates. The reservation could not be created.");
	// 			console.error("Any operations that already occurred as part of this transaction will be rolled back.");
	// 			return;
	// 		}
	// 		const listingsAndReviewsUpdateResults = await listingsAndReviewsCollection.updateOne(
	// 			{ name: nameOfListing },
	// 			{ $addToSet: { datesReserved: { $each: reservationDates } } },
	// 			{ session });
	// 		console.log(`${listingsAndReviewsUpdateResults.matchedCount} document(s) found in the listingsAndReviews collection with the name ${nameOfListing}.`);
	// 		console.log(`${listingsAndReviewsUpdateResults.modifiedCount} document(s) was/were updated to include the reservation dates.`);
	// 	}, transactionOptions);

	// 	if (transactionResults) {
	// 		console.log("The reservation was successfully created.");
	// 	} else {
	// 		console.log("The transaction was intentionally aborted.");
	// 	}
	// } catch(e){
	// 	console.log("The transaction was aborted due to an unexpected error: " + e);
	// } finally {
	// 	await session.endSession();
	// }

	// let loadedTime = null;
	// if (messages && messages.length) {
	// 	const messageIds = messages.map((message) => message.id);
	// 	filter.id = { $in: messageIds };

	// 	loadedTime = (new Date()).getTime();
	// 	const newValues = {
	// 		loadedAt: loadedTime,
    //     };
	// 	// const messageUpdateResult = db.collection('messages').updateMany(filter, { $set: newValues });
	// }

    // messages.sort((a,b) => a.createdAt - b.createdAt ); // sort by reversed created time

	// messages = messages.filter((messages) => {
	// 	return !messages.disabled;
	// });

	if (messages) {
		const result = {messages};
		if (viewedAtTime) {
			result.viewedAt = viewedAtTime;
		}
		// if (loadedTime) {
		// 	result.loadedAt = loadedTime;
		// }
		response(res, result);
	} else {
		response(res, {error: true});
	}
}