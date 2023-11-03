'use strict';

const http = require('http');

const { port, host } = require('./config.json');

const server = http.createServer((req, res) => {
    /* console.log(Object.keys(req));
    console.log(req.httpVersion);
    console.log(req.httpVersionMajor);
    console.log(req.httpVersionMinor);
    console.log(req.method);
    console.log(Object.entries(req.headers)); */

    const {
        pathname,
        search,
        searchParams } =
        new URL(`http://${req.headers.host}${req.url}`);
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    res.write(`<!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>Request info</title>
            </head>
            <body>
                <h1>Request info</h1>
                <h2>req.headers</h2>
                <pre>${JSON.stringify(req.headers, null, 4)}</pre>
                <h2>method: ${req.method}</h2>
                <h2>pathname: ${pathname}</h2>
                <h2>search: ${search}</h2>
                <h2>searchParams: ${searchParams}</h2>
                <h2>accept-language: ${req.headers['accept-language']}</h2>
            </body>
        </html>`);
    res.end();
});

server.listen(port, host,
    () => console.log(`${host}:${port} serving...`));


