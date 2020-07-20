var sendgrid = require('sendgrid')(process.env.SENDGRID_API_KEY);

// console.log('process.env.SENDGRID_API_KEY', process.env.SENDGRID_API_KEY);

export function sendMail(options) {
    if (options) {
        if (!options.toEmail) {
            return Promise.reject(new Error('sendMail no toEmail supplied'));
        }
        if (!options.fromEmail) {
            return Promise.reject(new Error('sendMail no fromEmail supplied'));
        }
        if (!options.subject) {
            return Promise.reject(new Error('sendMail no subject supplied'));
        }
        if (!options.bodyText) {
            return Promise.reject(new Error('sendMail no bodyText supplied'));
        }

        var request = sendgrid.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: {
                personalizations: [
                    {
                        to: [
                        {
                            email: options.toEmail,
                        },
                        ],
                        subject: options.subject, // 'Hello World from the SendGrid Node.js Library!',
                    },
                ],
                from: {
                    email: options.fromEmail,  // 'test@example.com',
                },
                content: [
                    {
                        // type: 'text/plain',
                        type: 'text/html',
                        value: options.bodyText, // 'Hello, Email!',
                    },
                ],
            },
        });

        // console.log('body', {
        //     personalizations: [
        //         {
        //             to: [
        //             {
        //                 email: options.toEmail,
        //             },
        //             ],
        //             subject: options.subject, // 'Hello World from the SendGrid Node.js Library!',
        //         },
        //     ],
        //     from: {
        //         email: options.fromEmail,  // 'test@example.com',
        //     },
        //     content: [
        //         {
        //             type: 'text/plain',
        //             value: options.bodyText, // 'Hello, Email!',
        //         },
        //     ],
        // });
        // console.log('request', request);
        // console.log('sendgrid', sendgrid);

        return sendgrid.API(request)
            .then(response => {
                console.log('statusCode', response.statusCode);
                console.log('body', response.body);
                console.log('headers', response.headers);
                return {success: true};
            })
            .catch(error => {
                //error is an instance of SendGridError
                //The full response is attached to error.response
                console.log('error headers', error.response.statusCode);
                return {error: true, errorObject: error};
            });
    } else {
        return Promise.reject(new Error('sendMail no options supplied'));
    }
}