export const DEBUG = (process.env.NODE_ENV === 'development');

const hostname = (typeof window !== 'undefined') ? window.location.hostname : 'localhost';

const base = (process.env.NODE_ENV === 'development') ? 'http://' + hostname + ':3000' : ''; // 'http://192.168.1.5:3000' //'http://localhost:3000' //'https://flock-hub.herokuapp.com';
const folder = 'api';

export const API_PATH = base + '/' + folder;

const config = {
    API_PATH,

    DEBUG,
}

export default config;