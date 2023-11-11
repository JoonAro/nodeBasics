'use strict';

const http = require('http');
const path = require('path');

const { port, host } = require('./config.json');

const { sendFile } = require('./functionLibrary');
const { search } = require('./datalayer');

const homePath = path.join(__dirname, 'home.html');
//we take both root and searchparams
const server = http.createServer((req, res) => {
    const {
        pathname,
        searchParams
    } = new URL(`http://${req.headers.host}${req.url}`);

    const route = decodeURIComponent(pathname);
    //console.log(req.method);
    //we are only using GET now
    if (route === '/') {
        //send file from homepath to html
        sendFile(res, homePath);
    }
    //if route has styles then send file from that folder
    //later we will make a version where it takes the filetype automatically
    else if (route.startsWith('/styles/')) {
        sendFile(res, path.join(__dirname, route), 'text/css');
    }
    else if (route.startsWith('/js/')) {
        sendFile(res, path.join(__dirname, route), 'text/javascript');
    }
    else {
        let result = [];
        if (route === '/persons') {
            result = search();
            //returns every person in an array
        }
        else if (searchParams.has('value')) {
            //persons firstname, lastname or age
            const value = searchParams.get('value');
            if (route === '/persons/firstname') {
                result = search('firstname', value);
            }
            else if (route === '/persons/lastname') {
                result = search('lastname', value);
            }
            else if (route === '/persons/age') {
                result = search('age', value);
            }
        }
        else {
            result = { message: 'Key not found' };
        }
        res.writeHead(200, { 'Content-Type': 'application.json' });
        res.end(JSON.stringify(result));
    }//end of outer else
});

server.listen(port, host,
    () => console.log(`${host}:${port} serving ...`));