export const DEBUG = (!!process.env.NODE_ENV.match(/development|staging/));

export const MONGODB_URI = process.env.MONGODB_URI;
export const MONGODB_DB = process.env.MONGODB_DB;

const config = {
    DEBUG,

    MONGODB_URI,
    MONGODB_DB,
}

export default config;