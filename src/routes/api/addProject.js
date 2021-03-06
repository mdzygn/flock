import { init, validateCredentials, response, filterItemDetails, generateId } from '../../server/mongo.js';

import projectDefaultChannels from '../../server/data/projectDefaultChannels';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;

	if (!await validateCredentials(db, options)) {
		response(res, {invalid: true});
		return;
	}

	let details = options.details;

	if (details && details.id) {

		const projectDetails = {
			id: true,

			ownerId: true,

			slug: true,
			title: true,
			description: true,
			details: true,

			headerImage: true,

			public: true,

			createdAt: true,
			lastActiveAt: true,
			modifiedAt: true,

			// likeCount: true,
			// followCount: true,

			isNew: true,

			location: true,
			tags: true,
			skills: true,
			links: true,
			team: true,
			posts: true,
		};

		details = filterItemDetails(details, projectDetails);

		details.likeCount = 0;
		details.followCount = 0;

		details.createdAt = (new Date()).getTime();
		details.modifiedAt = details.createdAt;
		details.lastActiveAt = details.createdAt;

		const result = await db.collection('projects').insertOne(details);

		if (result) {
			let channelAddFailed = false;
			let defaultChannel, channelDetails;
			for (var channelI = 0; channelI < projectDefaultChannels.length; channelI++) {
				defaultChannel = projectDefaultChannels[channelI];
				if (!defaultChannel.disabled) {
					channelDetails = Object.assign({}, defaultChannel);

					channelDetails.id = generateId(10);

					channelDetails.projectId = details.id;
					channelDetails.userId = options.userId;

					channelDetails.createdAt = (new Date()).getTime();
					channelDetails.modifiedAt = channelDetails.createdAt;
					channelDetails.lastActiveAt = channelDetails.createdAt;

					const channelResult = await db.collection('channels').insertOne(channelDetails);
					if (!channelResult) {
						channelAddFailed = true;
						break;
					}
				}
			}

			if (!channelAddFailed) {
				// console.log('details.userId', options.userId, 'details.id', details.id);
				const userUpdateResult = await db.collection('users').updateOne({ id: options.userId }, { $push: { projects: details.id } });

				if (userUpdateResult) {
					response(res, {success: true});
				} else {
					response(res, {error: true});
				}
			} else {
				response(res, {error: true});
			}
		} else {
			response(res, {error: true});
		}
	} else {
		response(res, {error: true});
	}
}