import { init, response, filterItemArrayDetails } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;

	const userResults = await db.collection('users').find({}).toArray();

	const userDetails = {
                id: true,

                username: true,

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

        for (let user, userI = 0; userI < userResults.length; userI++) {
                user = userResults[userI];
                if (!user.pass) {
                        user.set = false;
                }

                if (!user.name) {
                        user.name = user.fullName;
                }
        }


	const users = filterItemArrayDetails(userResults, userDetails);

	// console.log('filtered users', users);

	// const users = []; // to test returning no users

	if (users) {
		response(res, users);
	} else {
		response(res, {error: true});
	}
}