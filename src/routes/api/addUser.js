import { init, response, filterItemDetails } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;
	let details = options.details;

	if (details && details.usercode) { // details.username &&

		const userDetails = {
			id: true,

			// username: true,
			usercode: true,

			fullName: true,
			firstName: true,
			lastName: true,

			email: true,

			bio: true,

			skills: true,

			avatarImage: true,
			coverImage: true,

			style: true,

			location: true,
		};

		details = filterItemDetails(details, userDetails);

		// TODO: validate username
		// TODO: validate usercode
		// TODO: validate email

		// console.log('filtered user details', details);

		details.email = details.email.trim();

		const exisitingEmail = await db.collection('users').findOne({ email: { $regex : new RegExp('^' + details.email + '$', 'i') }  });
		if (exisitingEmail) {
			response(res, {invalid: true, errorType: 'email_exists'});
		} else {
			// const exisitingUser = await db.collection('users').findOne({ username: details.username });
			// if (exisitingUser) {
			// 	response(res, {invalid: true, errorType: 'username_exists'});
			// } else {
				details.createdAt = (new Date()).getTime();
				details.modifiedAt = details.createdAt;
				details.lastActiveAt = details.createdAt;

				const result = await db.collection('users').insertOne(details);

				if (result) {
					response(res, {success: true});
				} else {
					response(res, {error: true});
				}
			// }
		}
	} else {
		response(res, {error: true});
	}
}