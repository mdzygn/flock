import { init, response, filterItemDetails } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;
	const username = options.username;
	const pass = options.pass; // TODO check pass

	const user = await db.collection('users').findOne({ username: username });

	if (user) {
		const targetPass = user.pass ? user.pass : user.usercode;

		const userDetailsSchema = {
			id: true,

			username: true,

			usercode: true, // return so can login and authorise

			fullName: true,
			firstName: true,
			lastName: true,

			bio: true,

			skills: true,

			postsCount: true,
			likesCount: true,
			followsCount: true,

			avatarImage: true,
			coverImage: true,

			style: true,

			connected: true,
			requestedConnection: true,

			location: true,
		};

		const userDetails = filterItemDetails(user, userDetailsSchema);

		if (pass === targetPass) {
			response(res, userDetails);
		} else {
			response(res, {invalid: true});
		}
	} else {
		response(res, {invalid: true});
	}
}