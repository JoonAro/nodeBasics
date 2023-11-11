'use strict';

const persons = require('./persons.json');

function search(key, value) {
    //if key and value are not null
    if (key && value) {
        const found = [];
        for (const person of persons) {
            //you can use person.age for jason values
            // == because we want this function to take numbers and strings === means it has to be the same type
            if (person[key] == value) {
                found.push(person);
            }
        }
        return found;
    }
    else {
        return persons;
    }
}

module.exports = { search }