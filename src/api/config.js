const base = (process.env.NODE_ENV === 'development') ? 'http://localhost:3000' : '';//'https://flock-hub.herokuapp.com';
const folder = 'api';

export const API_PATH = base + '/' + folder;

export const MONGODB_URL_DEV = 'mongodb://heroku_j81rj6mx:m3hh52jauntp431k7nk3jsa3p@ds125041.mlab.com:25041/heroku_j81rj6mx';
export const MONGODB_URL_STAGING = 'mongodb://heroku_4q6g8lwt:jiookdgcmutmsisg2v4inq89it@ds223812.mlab.com:23812/heroku_4q6g8lwt';
export const MONGODB_URL = MONGODB_URL_DEV;
export const MONGODB_DB = 'heroku_4q6g8lwt';

const config = {
    MONGODB_URL,
    MONGODB_DB,
}

export default config;