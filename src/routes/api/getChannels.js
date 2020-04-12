import { init, response, errorResponse, filterItemsByProjectAccess, validateCredentials } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;

	const validLogin = await validateCredentials(db, options);

	const id = options && options.id;
	const projectId = options && options.projectId;
	const userId = options && options.userId;

	const filter = {};
	filter.disabled = {$ne: true};
	if (id) {
		filter.id = id;
	}
	if (projectId) {
		filter.projectId = projectId;
	}

	if (!(id || projectId)) {
		errorResponse(res, {}, {errorMsg: 'id or projectId not supplied'});
		return;
	}

	let channels = await db.collection('channels').find(filter).toArray();

	channels = await filterItemsByProjectAccess(channels, userId, validLogin);

	// const channels = []; // to test returning no channels

	if (channels) {
		response(res, channels);
	} else {
		response(res, {error: true});
	}
}