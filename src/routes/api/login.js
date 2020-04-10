import { init, response, filterItemDetails } from '../../server/mongo.js';

const bcrypt = require('bcrypt');


export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;
	const username = options.username;
	const pass = options.pass; // TODO check pass

	if (username) {
		const user = await db.collection('users').findOne({ username: username });

		if (user) {
			let passValid = false;
			if (user.pass) {
				passValid = bcrypt.compareSync(pass, user.pass);
			} else {
				passValid = pass === user.usercode;
			}
			if (passValid) {
				const userDetailsSchema = {
					id: true,

					username: true,

					usercode: true, // return so can login and authorise

					name: true,
					// fullName: true,
					// firstName: true,
					// lastName: true,

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

					set: true,
				};

				if (!user.pass) {
					user.set = false;
				}

                if (!user.name) {
					user.name = user.fullName;
				}

				const userDetails = filterItemDetails(user, userDetailsSchema);

				response(res, userDetails);
			} else {
				response(res, {invalid: true}); // pass not valid
			}
		} else {
			response(res, {invalid: true}); // no user found
		}
	} else {
		response(res, {invalid: true}); // no user specified
	}
}