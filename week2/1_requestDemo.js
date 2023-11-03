'use strict';

const http = require('http');

const { port, host } = require('./config.json');

const server = http.createServer((req, res) => {
    //console.log(req.url);
    const urldata = new URL(`http://${host}:${port}${req.url}`)
    console.log(urldata);
    const { pathname } = urldata;
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    if (pathname === '/aaa') {
        res.write('aaa');
    }
    else {
        res.write('xyz');
    }
    res.end();
});

server.listen(port, host,
    () => console.log(`${host}:${port} serving...`));
