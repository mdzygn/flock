import { init, response, errorResponse, generateId } from '../../server/mongo.js';
import { sendMail } from '../../server/mail.js';

import Config from '../../server/config.js';
import locale from '../../server/locale';

export async function post(req, res, next) {
	const { db } = await init();

	const options = req.body;
    let email = options.email;

	email = email.toLowerCase().trim();

	if (email) {
        let user = await db.collection('users').findOne({ email });

        let emailSent = false;
        let newUsercode = '';
        let sendResult = null;
        let emailOptions = {
            toEmail: email,
            fromEmail: Config.FROM_EMAIL,
        };

		if (user) {
            newUsercode = generateId(8);
            const details = {
                pass: '',
                usercode: newUsercode,
                resetPass: true,
            };

            const result = await db.collection('users').updateOne({ email }, { $set: details } );

            if (result) {
                emailOptions.subject = locale.PASSWORD_RESET_EMAIL.SUBJECT;
                emailOptions.bodyText = locale.PASSWORD_RESET_EMAIL.BODY
                    .split('[USERCODE]').join(newUsercode)
                    .split('[SITE]').join(Config.SITE)
                    .split('[SITE_URL]').join(Config.SITE_URL);

                console.log('send email', emailOptions);

                sendResult = await sendMail(emailOptions).then(sendResponse => {
                        if (sendResponse.success) {
                            console.log('send response', sendResponse);
                            response(res, {success: true}); // TODO: for temp debug return: usercode: newUsercode
                        } else {
                            console.log('error response', sendResponse);
                            errorResponse(res, {}, {errorMsg: 'can\'t send email', errorStatus: sendResponse.errorObject && sendResponse.errorObject.response && sendResponse.errorObject.response.statusCode});
                        }
                    })
                    .catch(error => {
                        console.log('error', error);
                        errorResponse(res, {}, {errorMsg: 'can\'t send email', errorStatus: error && error.response && error.response.statusCode});
                    });
            } else {
                errorResponse(res, {}, {errorMsg: 'can\'t update user details'});
                // response(res, {error: true});
            }
		} else {
            emailOptions.subject = locale.PASSWORD_RESET_UNREGISTERED_EMAIL.SUBJECT;

            emailOptions.bodyText = locale.PASSWORD_RESET_UNREGISTERED_EMAIL.BODY
                .split('[SITE]').join(Config.SITE)
                .split('[SITE_URL]').join(Config.SITE_URL);
            // emailOptions.bodyText = 'Someone has requested a password reset for this email address<br/>However this email address is not yet registered.<br/>Sign up here: ' + Config.SITE_URL;

            console.log('send general', emailOptions);

            sendResult = await sendMail(emailOptions).then(sendResponse => {
                    if (sendResponse.success) {
                        console.log('send general response', sendResponse);
                        emailSent = true;
                        response(res, {success: true}); // TODO: temp debug
                    } else {
                        console.log('error response', sendResponse);
                        errorResponse(res, {}, {errorMsg: 'can\'t send email', errorStatus: sendResponse.errorObject && sendResponse.errorObject.response && sendResponse.errorObject.response.statusCode});
                    }
                })
                .catch(error => {
                    console.log('error', error);
                    errorResponse(res, {}, {errorMsg: 'can\'t send email', errorStatus: error && error.response && error.response.statusCode});
                });
        }
	} else {
		response(res, {invalid: true}); // no user specified
	}
}