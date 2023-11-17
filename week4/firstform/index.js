'use strict';
//use module from node to create the server
const http = require('http');
const path = require('path');

const { sendFile } = require('./functionLibrary');

const { port, host } = require('./config.json');
//create path to different sections
const formPath = path.join(__dirname, 'form.html');

const server = http.createServer(async (req, res) => {
    //check which method is used
    const method = req.method.toUpperCase();
    if (method === 'GET') {
        sendFile(res, formPath);
    }
    //if you don't await post it will not work because it wont wait
    else if (method === 'POST') {
        const formData = await getRequestPostBodyData(req);
        res.writeHead(200, {
            'Content-type': 'application/json'
        })
        res.end(JSON.stringify(formData));
    }
    //check this if issues arise
    else {
        res.end('method not supported');
    }


});

server.listen(port, host,
    () => console.log(`${host}:${port} serving...`));
//return promise that will handle our data
function getRequestPostBodyData(request) {
    //content type has to be written with lowercase
    return new Promise((resolve, reject) => {
        if (request.headers['content-type'] !=
            'application/x-www-form-urlencoded') {
            reject('Wrong Content-Type');
        }
        else {
            const databuffer = [];

            request.on('data', datapart => databuffer.push(datapart));

            request.on('end', () => {
                const params = new URLSearchParams(Buffer.concat(databuffer).toString());
                const jsonResult = {};
                params.forEach((value, key) => jsonResult[key] = value);
                resolve(jsonResult);
            });

            request.on('error', () => reject('Error in transmission'));
        }
    });
}