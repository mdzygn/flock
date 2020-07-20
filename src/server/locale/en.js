const locale = {
	PASSWORD_RESET_EMAIL: {
        SUBJECT: 'Flock Account',
        BODY: 'Your Flock password has been reset.<br/><br/>Your temporary password is: [USERCODE]<br/><br/>After you log in, you will be prompted to change your password.<br/><br/>Log in here: <a href="[SITE_URL]">[SITE]</a>.',
    },
	PASSWORD_RESET_UNREGISTERED_EMAIL: {
		SUBJECT: 'Flock Account',
        BODY: 'Someone has requested a password reset for this email address, however this email address is not yet registered.<br/><br/>Sign up here at <a href="[SITE_URL]">[SITE]</a>.',
    },
}

export default locale;