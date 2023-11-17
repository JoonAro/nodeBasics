'use strict';
//filesystem
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

const read = filepath => {
    const extension = path.extname(filepath).toLowerCase();
    const mime = MIMETYPES[extension] ||
        { type: 'application/octet-stream', encoding: 'binary' };
    //using parentheses around curly parentheses to avoid code block of the curly braces
    return fs.promises.readFile(filepath, mime.encoding)
        .then(fileData => ({ fileData, mime }))
        .catch(err => err);
}

const send = (res, resource) => {
    res.writeHead(200, {
        'Content-Type': resource.mime.type,
        'Content-Length': Buffer.byteLength(resource.fileData, resource.mime.encoding)
    });
    res.end(resource.fileData, resource.mime.encoding)
}

module.exports = { read, send };