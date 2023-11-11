'strict'

const { search } = require('./datalayer');

console.log(search());
console.log(search('firstname', 'Matt'));
console.log(search('lastname', 'River'));
console.log(search('lastname', 'Jones'));
console.log(search('age', 33));