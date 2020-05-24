export const DEBUG = (!!process.env.NODE_ENV.match(/development|staging/));

export const MONGODB_URI = process.env.MONGODB_URI; // + '?retryWrites=false';
export const MONGODB_DB = process.env.MONGODB_DB;

export const MESSAGE_SYNC_DEBUG = false;

const config = {
    DEBUG,

    MESSAGE_SYNC_DEBUG,

    MONGODB_URI,
    MONGODB_DB,
}

export default config;