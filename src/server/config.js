export const DEBUG = (!!process.env.NODE_ENV.match(/development|staging/));

export const MONGODB_URI = process.env.MONGODB_URI; // + '?retryWrites=false';
export const MONGODB_DB = process.env.MONGODB_DB;

export const MESSAGE_SYNC_DEBUG = false && DEBUG;

export const SITE_URL = 'http://flock-hub.herokuapp.com';

export const FROM_EMAIL = 'matt@matthalford.com'; // 'mattdhalford@gmail.com'; // 'support@flock-hub.herokuapp.com';

export const SUBJECT_PASSWORD_RESET = 'Password Reset';
export const SUBJECT_PASSWORD_RESET_UNREGISTERED = 'Flock Account';

const config = {
    DEBUG,

    MESSAGE_SYNC_DEBUG,

    MONGODB_URI,
    MONGODB_DB,

    SITE_URL,

    FROM_EMAIL,

    SUBJECT_PASSWORD_RESET,
    SUBJECT_PASSWORD_RESET_UNREGISTERED,
}

export default config;