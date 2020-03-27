import config from './config';

const mongo = require('mongodb');

let client = null;
let db = null;

export async function init() {
    if (!client) {
        client = await mongo.MongoClient.connect(config.MONGODB_URL);
        db = client.db(config.MONGODB_DB);
    }
    return { client, db };
}