'use strict';

const { CODES, TYPES, MESSAGES } = require('./statusCodes');
const { createStorageLayer } = require('./storageLayer');

function createDataStorage(storagePath, storageConfig) {

    const {
        getAllFromStorage,
        getFromStorage,
        addToStorage,
        removeFromStorage,
        getKeys,
        primary_key
    } = createStorageLayer(storagePath, storageConfig);

    //Datastorage class

    class Datastorage {

        get CODES() {
            return CODES;
        }

        get TYPES() {
            return TYPES;
        }

        get PRIMARY_KEY() {
            return primary_key;
        }

        get KEYS() {
            return getKeys();
        }

        getAll() {
            return getAllFromStorage();
        }

        get(value, key = primary_key) {
            return getFromStorage(value, key);
        }
        //takes item in to storage. if there is something check if there is an item with a primary_key. primary_key isn't zero
        insert(item) {
            return new Promise(async (resolve, reject) => {
                if (item) {
                    if (!item[primary_key]) {
                        reject(MESSAGES.NOT_INSERTED());
                    }
                    //if items length is 1 and not zero
                    //double parentheses makes it await until getfromstorage gets the data and it can really check it
                    else if ((await getFromStorage(item[primary_key])).length > 0) {
                        reject(MESSAGES.ALREADY_IN_USE(item[primary_key]));
                    }
                    //if await addToStorage(item)=true
                    else if (await addToStorage(item)) {
                        resolve(MESSAGES.INSERT_OK(primary_key, item[primary_key]));
                    }
                    else {
                        reject(MESSAGES.NOT_INSERTED());
                    }
                }
                else {
                    reject(MESSAGES.NOT_INSERTED());
                }
            });
        }//end of insert

        remove(value) {
            return new Promise(async (resolve, reject) => {
                //if there is no value
                if (!value) {
                    reject(MESSAGES.NOT_FOUND(primary_key, '--empty--'))
                }
                //if removeFromStorage() returns true
                else if (await removeFromStorage(value)) {
                    resolve(MESSAGES.REMOVE_OK(primary_key, value));
                }
                else {
                    reject(MESSAGES.NOT_REMOVED(primary_key, value))
                }
            });
        }//end of remove
    }//end of class
    //whenever the function is called a new datastorage object is created
    return new Datastorage();
}//end of function

module.exports = { createDataStorage }

