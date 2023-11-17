'use strict';

const http = require('http');
const path = require('path');

const { sendFile } = require('./functionLibrary')

const { getRequestPostBodyData } = require('./requestHandler');

const { port, host } = require('./config.json');
const { log } = require('console');

const homeJsonPath = path.join(__dirname, 'homeJson.html');
const homeUrlPath = path.join(__dirname, 'homeUrl.html');
const formPath = path.join(__dirname, 'form.html');
const inputFormPath = path.join(__dirname, 'inputForm.html');

const server = http.createServer(async (req, res) => {
    const method = req.method.toUpperCase();
    if (method === 'GET') {
        sendFile(res, inputFormPath);
        //sendFile(res, formPath);
        //sendFile(res, homeUrlPath);
        //sendFile(res, homeJsonPath);
    }
    else if (method === 'POST') {
        const data = await getRequestPostBodyData(req);
        //console.log(data);
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(data));
    }
});

server.listen(port, host, () => console.log(`${port}:${host} serving...`));