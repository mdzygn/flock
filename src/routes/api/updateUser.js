import { init, response, validateCredentials, filterItemDetails } from '../../server/mongo.js';

export async function post(req, res, next) {
	const { db } = await init();

    const options = req.body;

    if (details.username && details.pass) {
        options.setAccount = true;
    }

	if (!await validateCredentials(db, options)) {
		response(res, {invalid: true});
		return;
	}

    const userId = options.id;

    let details = options.details;

    if (options.setAccount) {
        const curUser = await db.collection('users').findOne({ id: userId });
        if (curUser) {
            if (!curUser.pass) {
                const exisitingUser = await db.collection('users').findOne({ username: details.username });
                if (exisitingUser) {
                    response(res, {invalid: true, errorType: 'username_exists'});
                } else {
                    const userDetails = {
                        username: true,
                        pass: true,
                    };

                    details = filterItemDetails(details, userDetails);

                    const result = await db.collection('users').updateOne({ id: userId }, { $set: details } );

                    if (result) {
                        response(res, {success: true});
                    } else {
                        response(res, {error: true});
                    }
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