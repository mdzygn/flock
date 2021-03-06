import { init, response, filterItemDetails } from '../../server/mongo.js';

const bcrypt = require('bcryptjs');


export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;
	let username = options.username;
	const pass = options.pass; // TODO check pass

	username = username.toLowerCase().trim();

	if (username) {
		let user = await db.collection('users').findOne({ username: username });
		if (!user) {
			user = await db.collection('users').findOne({ email: username });
		}

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

					resetPass: true,
				};

				if (!user.pass) {
					user.set = false;
				}

                if (!user.name) {
					user.name = user.fullName;
				}

                if (!user.resetPass) {
                	delete user.resetPass;
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