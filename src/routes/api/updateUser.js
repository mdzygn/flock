import { init, response, errorResponse, validateCredentials, filterItemDetails } from '../../server/mongo.js';

const bcrypt = require('bcryptjs');

export async function post(req, res, next) {
	const { db } = await init();

    const options = req.body;

    let details = options.details;
    let resetPass = details.resetPass;
    delete details.resetPass;

    if ((details.username || resetPass) && details.pass) {
        options.setAccount = true;
    }

	if (!await validateCredentials(db, options)) { // after setAccount set to ensure that is validated
		errorResponse(res, {invalid: true}, {errorMsg: 'invalid credentials'});
		return;
	}

    const userId = (options && options.userId) || null;

    const curUser = await db.collection('users').findOne({ id: userId });
    if (curUser) {
        if (options.setAccount) {
            if (resetPass && !curUser.resetPass) {
                errorResponse(res, {invalid: true}, {errorMsg: 'not resetting password'});
                return;
            }
            if (!resetPass && curUser.resetPass) {
                errorResponse(res, {invalid: true}, {errorMsg: 'resetting password'});
                return;
            }

            if (!resetPass) {
                details.username = details.username.toLowerCase().trim();

                // reference USER_NAME_MIN_LENGTH, USER_NAME_MAX_LENGTH
                const usernameValid = details.username.length >= 3 && details.username.length <= 16 && details.username.match(/^(?!.*\.\.)(?!.*__)(?!.*\._)(?!.*_\.)(?!.*\.$)(?!\..*$)[a-z0-9._]+$/); // lowercase only
                // const usernameValid = details.username.match(/^(?=.{4,16}$)(?![_.])(?!.*[_.]{2})[a-z0-9._]+(?<![_.])$/); // lowercase only
                // const usernameValid = details.username.match(/^(?=.{4,16}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/i);
                if (!usernameValid) {
                    errorResponse(res, {invalid: true}, {errorMsg: 'invalid username'});
                    return;
                }
            }

            if (!curUser.pass) {
                const exisitingUser = await db.collection('users').findOne({ username: { $regex : new RegExp('^' + details.username + '$', 'i') } });
                if (exisitingUser && exisitingUser.id !== userId) {
                    errorResponse(res, {invalid: true, errorType: 'username_exists'}, {errorMsg: 'username exists'});
                    // response(res, {invalid: true, errorType: 'username_exists'});
                } else {
                    const pass = details.pass;

                    const userDetailSchema = {
                        username: !resetPass, // true,
                    };

                    details = filterItemDetails(details, userDetailSchema);

                    if (resetPass) {
                        details.resetPass = false;
                    }

                    // console.log('set details', details, 'resetPass', resetPass);

                    bcrypt.hash(pass, 10, async (err, hash) => {
                        if (!err) {
                            details.pass = hash;

                            const result = await db.collection('users').updateOne({ id: userId }, { $set: details } );

                            if (result) {
                                response(res, {success: true});
                            } else {
                                errorResponse(res, {}, {errorMsg: 'can\'t update user details'});
                                // response(res, {error: true});
                            }
                        } else {
                            errorResponse(res, {}, {errorMsg: 'error making hash'});
                            // response(res, {error: true});
                        }
                    });
                }
            } else {
                errorResponse(res, {}, {errorMsg: 'account details already set'});
                // response(res, {error: true});
            }
        } else {
            const setUserDetailSchema = {
                username: true,

                name: true,
                bio: true,

                avatarImage: true,
                coverImage: true,

                skills: true,
                location: true,
                style: true,
            };

            details = filterItemDetails(details, setUserDetailSchema);

            const result = await db.collection('users').updateOne({ id: userId }, { $set: details } );

            if (result) {
                response(res, {success: true});
            } else {
                errorResponse(res, {}, {errorMsg: 'can\'t update user details'});
                // response(res, {error: true});
            }
        }
    } else {
        errorResponse(res, {}, {errorMsg: 'user not found'});
        // response(res, {error: true});
    }
}