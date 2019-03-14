const MongoClient = require('mongodb').MongoClient;
const config = require('../constants/config');
const log = require('../utility/logger')('routes/api');

let connection = null;

const initDB = (callback) => {
    if (connection) {
        log('Attempted to initialize DB twice!');
        return callback(null, connection);
    }

    MongoClient.connect(
        config.DB_URL,
        {useNewUrlParser: true},
        (err, db) => {
            if (err) {
                return callback(err);
            }

            log('DB initialized.');
            connection = db;

            return callback(null, connection);
        }
    );
};

const getDB = () => {
    if (!connection) { log('DB has not been initialized. Please call initDB first.'); }

    return connection;
};

module.exports = {
    initDB,
    getDB
};
