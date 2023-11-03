'use strict';

const http = require('http');

const { port, host } = require('./config.json');

const server = http.createServer((req, res) => {
    const {
        searchParams
    } = new URL(`http://${req.headers.host}${req.url}`);

    let message = 'stranger';
    if (searchParams.has('name')) {
        message = searchParams.get('name').toUpperCase();
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<h1>Hello ${message}!</h1>`);

});

server.listen(port, host,
    () => console.log(`${host}:${port} serving...`));