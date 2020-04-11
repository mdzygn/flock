import { init, response } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;


	const projectId = options && options.projectId;

	const filter = {};
	filter.disabled = {$ne: true};
	if (projectId) {
		filter.projectId = projectId;
	}

	const channels = await db.collection('channels').find(filter).toArray();

	// const channels = []; // to test returning no channels

	if (channels) {
		response(res, channels);
	} else {
		response(res, {error: true});
	}
}