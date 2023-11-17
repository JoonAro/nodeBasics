'use strict';

const { read } = require('./libraryForRequestHandling');

read('test.js').then(console.log).catch(console.log);