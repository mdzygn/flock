import { init, validateCredentials, response, generateId } from '../../server/mongo.js';

import projectDefaultChannels from '../../server/data/projectDefaultChannels';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;

	if (!await validateCredentials(db, options)) {
		response(res, {invalid: true});
		return;
	}

	const details = options.details;

	if (details && details.id) {
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
}