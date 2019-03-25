const joi = require('joi');
const gameStateSchema = require('../schemas/game-state-schema');
const log = require('../utility/logger')('utility/game-schema-validator');

// Returns promise
const insertOnValid = (data, collection) => {
    return new Promise((resolve, reject) => {
        joi.validate(data, gameStateSchema, (err, value) => {
            if (err) {
                log(('Failed to validate record:', err));
                reject({data: null, err: err});
            } else {
                collection.insertOne(value, (err) => {
                    if (err) {
                        log(('Failed to insert record:', err));
                        reject({data: null, err: err});
                    } else {
                        resolve({data: data});
                    }
                });
            }
        });
    });
};

// Returns promise
const updateOnValid = (data, filter, collection) => {
    return new Promise((resolve, reject) => {
        joi.validate(data, gameStateSchema, (err) => {
            if (err) {
                log(('Failed to validate record:', err));
                reject({data: null, err: err});
            } else {
                collection.updateOne(filter, {$set: data}, (err) => {
                    if (err) {
                        log(('Failed to insert record:', err));
                        reject({data: null, err: err});
                    } else {
                        resolve({data: data});
                    }
                });
            }
        });
    });
};

module.exports = {
    insertOnValid,
    updateOnValid
};
