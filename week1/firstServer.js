'use strict';

const http = require('http');

//Port needs to be free and not used by anything else
const port = 3000;
const host = 'localhost'; //'127.0.0.1'

const server = http.createServer((request,response)=>{
    response.writeHead(200,{'content-type':'text/html;charset=utf-8'});
    response.write('<h1>Hello</h1>');
    response.end();
});

server.listen(port,host,()=>console.log(`Server ${host} is serving at port ${port}`)
);