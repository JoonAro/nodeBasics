'use strict';

const http = require('http');

const {port,host} = require('./config.json');

const cars = require('./cars.json');

const server = http.createServer((req,res)=>{
    res.writeHead(200,{'content-type':'text/html'});
    res.end(createHtml(cars));
});

server.listen(port,host,()=>console.log(`${host}:${port}...`));

function createHtml(carArray){
    let htmlString=`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Cars</title>
      </head>
      <body>
        <h1 style="color:yellow">Cars</h1>`;

    for(const car of carArray){
        htmlString+=`<h2 style="color:${car.color}">${car.model}:${car.licence}</h2>\n`;
    }
    htmlString +=`</body>
                </html>`;
    return htmlString;
}