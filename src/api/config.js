const base = (process.env.NODE_ENV === 'development') ? 'http://localhost:3000' : '';//'https://flock-hub.herokuapp.com';
const folder = 'api';

export const API_PATH = base + '/' + folder;

const config = {
    API_PATH,
}

export default config;