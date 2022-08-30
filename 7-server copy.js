const http = require('http');
const fs = require('fs');
const EventEmitter = require('events');
const path = require('path');
const logger = require('./6-events-2');

// import http from 'http';
// import fs from 'fs';
// import EventEmitter from 'events';
// import path from 'path';
const emitter = new EventEmitter();

const fsPromises = fs.promises;

const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    console.log(req.url, req.method);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    let filePath = path.join(__dirname, 'views', 'index.html');

    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) throw err;
      res.end(data);
    });
  }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//listen for the 'log' event
emitter.on('log', (msg) => logger(msg));

//send a 'log'
emitter.emit('log', 'some log here');
