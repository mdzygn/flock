const base = (process.env.NODE_ENV === 'development') ? 'http://localhost:3000' : '';//'https://flock-hub.herokuapp.com';
const folder = 'api';

export const API_PATH = base + '/' + folder;

export const MONGODB_URI = process && process.env.MONGODB_URI;
export const MONGODB_DB = process && process.env.MONGODB_DB;

const config = {
    MONGODB_URI,
    MONGODB_DB,
}

export default config;