import { init, response, errorResponse, generateId } from '../../server/mongo.js';

const bcrypt = require('bcrypt');


export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;
    let email = options.email;

	email = email.toLowerCase().trim();

	if (email) {
        let user = await db.collection('users').findOne({ email });

        let emailSent = false;
        let newUsercode = '';

		if (user) {
            newUsercode = generateId(8);
            const details = {
                pass: '',
                usercode: newUsercode,
            };

            const result = await db.collection('users').updateOne({ email }, { $set: details } );

            if (result) {
                emailSent = true;
            } else {
                errorResponse(res, {}, {errorMsg: 'can\'t update user details'});
                // response(res, {error: true});
            }
		} else {
            emailSent = true;
        }

        if (emailSent) {
            response(res, {success: true, usercode: newUsercode}); // TODO: temp debug
        } else {
            response(res, {invalid: true});
        }
	} else {
		response(res, {invalid: true}); // no user specified
	}
}