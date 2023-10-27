'use strict';

const http = require('http');

const {port,host} = require('./config.json');
const person = require('./person.json');

/* console.log(person);
console.log(JSON.stringify(person)); */


const server = http.createServer((req, res)=>{
    res.writeHead(200,{'content-type':'application/json'});
    res.end(JSON.stringify(person));
});

server.listen(port,host,()=>console.log(`${host}:${port} working`));