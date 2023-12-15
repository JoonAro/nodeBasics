'use strict';
//filesystem module in node
const fs = require('fs');
const path = require('path');
//every file isn't utf-8

const MIMETYPES = {
    ".html": { "type": "text/html", "encoding": "utf-8" },
    ".js": { "type": "text/javascript", "encoding": "utf-8" },
    ".css": { "type": "text/css", "encoding": "utf-8" },
    ".json": { "type": "application/json", "encoding": "utf-8" },
    ".png": { "type": "image/png", "encoding": "binary" },
    ".jpeg": { "type": "image/jpeg", "encoding": "binary" },
    ".jpg": { "type": "image/jpeg", "encoding": "binary" },
    ".gif": { "type": "image/gif", "encoding": "binary" },
    ".ico": { "type": "image/vdn.microsoft.icon", "encoding": "binary" },
}
//takes last part of your filename
const read = filepath => {
    const extension = path.extname(filepath).toLowerCase();
    //we have some encoding in const mime either utf 8 or binary
    const mime = MIMETYPES[extension] ||
        { type: 'application/octet-stream', encoding: 'binary' };
    //using parentheses around curly parentheses to avoid code block of the curly braces
    return fs.promises.readFile(filepath, mime.encoding)
        .then(fileData => ({ fileData, mime }))
        .catch(err => err);
}
//gives back an object that has filedata and mimetype. Mimetype knows the type and encoding.

//resource format: (fileData,mime) if you use send you have to have this file
const send = (res, resource) => {
    res.writeHead(200, {
        'Content-Type': resource.mime.type,
        'Content-Length': Buffer.byteLength(resource.fileData, resource.mime.encoding)
    });
    res.end(resource.fileData, resource.mime.encoding)
}

const sendJson = (res, jsonResource) => {
    const jsonData = JSON.stringify(jsonResource);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(jsonData);
}

const sendError = (res, message, type, code = 404) => {
    res.writeHead(code, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message, type }));
}
//no need for if else statements with this
const isIN = (route, ...routes) => {
    for (let start of routes) {
        if (route.startsWith(start)) return true;
    }
    return false;
}

const allowedFormats = [
    'application/x-www-form-urlencoded',
    'application/json'
];
//handles post operation
//two normal forms that are usually sent and this server will only recognize these
//we create a buffer to collect all the data because we get the data in small junks in databuffer
//when data exceeds a limit they are split up when sent to your machine so we have to wait 
const getRequestPostBodyData = request =>
    new Promise((resolve, reject) => {
        const type = request.headers['content-type'];
        if (allowedFormats.includes(type)) {
            const databuffer = [];
            //when data event happens we push it to databuffer
            request.on('data', datapart => databuffer.push(datapart));
            request.on('end', () => {
                const data = Buffer.concat(databuffer).toString();
                //if it's already application/json
                if (type === 'application/json') {
                    resolve(JSON.parse(data));
                }
                //if not only posibility is the other one in allowedFormats
                else {
                    const params = new URLSearchParams(data);
                    const jsonResult = {};
                    params.forEach((value, key) => jsonResult[key] = value);
                    resolve(jsonResult);
                }
            });

            request.on('error', () => reject('Error in transmission'));
        }
        else {
            reject('Wrong Content-Type');
        }
    });

module.exports = { read, send, sendJson, sendError, isIN, getRequestPostBodyData };