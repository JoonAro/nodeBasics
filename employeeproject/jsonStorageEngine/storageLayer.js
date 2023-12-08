'use strict';

const path = require('path');

const { readStorage, writeStorage } = require('./readerWriter');

function createStorageLayer(storageFolder, storageConfigFile) {
    const storageConfig = path.join(storageFolder, storageConfigFile);

    const { storageFile, adapterFile, primary_key } = require(storageConfig);

    const { adapt } = require(path.join(storageFolder, adapterFile));

    const storageFilePath = path.join(storageFolder, storageFile);

    //console.log('storageConfig', storageConfig);
    //console.log('storageFilePath', storageFilePath);
    //console.log('adapterPath', path.join(storageFolder, adapterFile));

    async function getAllFromStorage() {
        return await readStorage(storageFilePath);
    }

    async function getFromStorage(value, key = primary_key) {
        return (await readStorage(storageFilePath)).filter(item => item[key] == value)
    }
    //addtostorage writes over the earlier object
    //running through the adapt function so it will replace the number fields with numbers
    async function addToStorage(newObject) {
        const storage = await readStorage(storageFilePath);
        storage.push(adapt(newObject));
        return await writeStorage(storageFilePath, storage)
    }
    //finds first value of this and with unique id it's the only one
    //if it finds nothing it returns value below zero
    async function removeFromStorage(value) {
        const storage = await readStorage(storageFilePath);
        const i = storage.findIndex(item => item[primary_key] == value);
        //if it finds nothing we don't need to write everything again.
        if (i < 0) return false;
        storage.splice(i, 1);
        //because storage was changed we have to write it again without the deleted value
        return await writeStorage(storageFilePath, storage);

    }
    //...different keys from different objects
    async function getKeys() {
        const storage = await readStorage(storageFilePath);
        const keys = new Set(storage.flatMap(item => Object.keys(item)));
        return [...keys];
    }
    return {
        getAllFromStorage,
        getFromStorage,
        addToStorage,
        removeFromStorage,
        getKeys,
        primary_key
    }
} //end of createStorageLayer

module.exports = { createStorageLayer }