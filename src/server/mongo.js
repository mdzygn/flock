import config from './config';

const mongo = require('mongodb');

export const ObjectID = mongo.ObjectID;

let client = null;
let db = null;

export async function init() {
    if (!client) {
        client = await mongo.MongoClient.connect(config.MONGODB_URI, { useUnifiedTopology:true });
        db = client.db(config.MONGODB_DB);
    }
    return { client, db };
}

export function response(res, responseObject) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(responseObject));
}

export async function validateCredentials(db, options) {
    const userItem = await db.collection('users').findOne({ id: options.userId });

    if (userItem && userItem.usercode === options.usercode) {
        return true;
    } else {
        return false;
    }
}