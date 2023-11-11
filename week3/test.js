'use strict'

const person = {
    "firstname": "Matt",
    "lastname": "River",
    "age": 35
};

console.log(person.firstname);
console.log(person['firstname']);
let key = 'firstname';
key = 'lastname';
console.log(person[key]);
//run test.js 
function search(key) {
    console.log(person[key]);
}

search('age');