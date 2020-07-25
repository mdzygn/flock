export const DEBUG = (!!process.env.NODE_ENV.match(/development|staging/));

export const MONGODB_URI = process.env.MONGODB_URI; // + '?retryWrites=false';
export const MONGODB_DB = process.env.MONGODB_DB;

export const MESSAGE_SYNC_DEBUG = false && DEBUG;

export const SITE = 'flockprojects.com';
export const SITE_URL = 'https://flockprojects.com';

export const FROM_EMAIL = 'hello@flockprojects.com'; // 'mattdhalford@gmail.com'; // 'support@flock-hub.herokuapp.com';


const config = {
    DEBUG,

    MESSAGE_SYNC_DEBUG,

    MONGODB_URI,
    MONGODB_DB,

    SITE,
    SITE_URL,

    FROM_EMAIL,
}

export default config;