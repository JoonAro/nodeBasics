'use strict';

const http = require('http');
const path = require('path');

const { port, host } = require(path.join(__dirname, 'config.json'));
const { sendFile } = require(path.join(__dirname, 'functionLibrary.js'));

const homePath = path.join(__dirname, 'home.html');
const secondPath = path.join(__dirname, 'pageB.html');

const server = http.createServer((req, res) => {
    const {
        pathname
    } = new URL(`http://${req.headers.host}${req.url}`);
    //decoding weird characters from path
    const route = decodeURIComponent(pathname);

    if (route === '/') {
        sendFile(res, homePath);
    }
    else if (route === '/pagea') {
        sendFile(res, secondPath);
    }
    else if (route.startsWith('/styles/')) {
        sendFile(res, path.join(__dirname, route), 'text/css');
    }
    else {
        res.statusCode = 404;
        res.end('Error: page not found');
    }
});

server.listen(port, host,
    () => console.log(`${host}:${port} serving...`));
