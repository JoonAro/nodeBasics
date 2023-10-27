'use strict';

const http = require('http');

const {port,host} = require('./config.json');

const person = require('./person.json');

const server = http.createServer((req,res)=>{
    res.writeHead(200,{'content-type':'text/html'});
    res.write(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Person data</title>
  </head>
  <body>
    <h1>Person data</h1>
    <p>Firstname:${person.firstname}</p>
    <p>Lastname:${person.lastname}</p>
    <p>Age:${person.age}</p>
  </body>
</html>`);
res.end();
});

server.listen(port,host,()=>console.log(`${host}:${port}...`));

