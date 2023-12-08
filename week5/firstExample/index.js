'use strict';

const http = require('http');
const path = require('path');

const port = 3000;
const host = 'localhost';

const {
    read,
    send,
    sendJson,
    sendError,
    isIN,
    getRequestPostBodyData } = require('./libraryForRequestHandling');

//everything in the routes are opened in ...resourceroutes
const resourceRoutes = ['/pages/', '/styles/', '/js/', '/images/'];

const homePath = path.join(__dirname, 'home.html');

const server = http.createServer(async (req, res) => {
    const { pathname } = new URL(`http://${req.headers.host}`);
    const route = decodeURIComponent(pathname);
    console.log(req.headers);
    try {
        if (route === '/') {
            const result = await read(homePath);
            send(res, result);
            //send(res, await read(homePath))
        }
        else if (isIN(route, ...resourceRoutes)) {
            const result = await read(path.join(__dirname, route));
            send(res, result);
        }
        else {
            sendError(res, 'Not found', 'error');
            //404 not found from sendError function
        }
    }
    catch (err) {
        sendError(res, err.message, 'error,400')
    }
});
server.listen(port, host, () => console.log(`Server ${host}:${port} is serving...`));