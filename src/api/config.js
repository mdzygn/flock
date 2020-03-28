const base = (process.env.NODE_ENV === 'development') ? 'http://localhost:3000' : '';//'https://flock-hub.herokuapp.com';
const folder = 'api';

export const API_PATH = base + '/' + folder;

export const MONGODB_URL = 'mongodb://heroku_4q6g8lwt:jiookdgcmutmsisg2v4inq89it@ds223812.mlab.com:23812/heroku_4q6g8lwt';
export const MONGODB_DB = 'heroku_4q6g8lwt';

const config = {
    MONGODB_URL,
    MONGODB_DB,
}

export default config;