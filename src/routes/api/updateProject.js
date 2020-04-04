import { init } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;
	const details = options.details;
	const projectId = options.id;
	const isSuperficial = options.isSuperficial;
	const isModification = options.isModification;

	if (!isSuperficial) {
		details.lastActiveAt = (new Date()).getTime();
		if (isModification) {
			details.modifiedAt = details.lastActiveAt;
		}
	}

	//TODO: check allowed to modify project, isOwner, !archive, !deleted

	const result = await db.collection('projects').updateOne({ id: projectId }, { $set: details } );

	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(JSON.stringify(result));
}