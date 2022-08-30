const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;

const logger = require('./6-events-2');

const EventEmitter = require('events');

class Emitter extends EventEmitter {}

const em = new Emitter();

const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
  console.log('url: ', req.url);
  console.log('method: ', req.method);

  const ext = path.extname(req.url);

  let contentType;

  switch (ext) {
    case '.txt':
      contentType = 'text/plain';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.jpg':
      contentType = 'image/jpeg';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    default:
      contentType = 'text/html';
      break;
  }

  let filePath;

  if (contentType === 'text/html') {
    if (req.url === '/') {
      console.log('1');
      filePath = path.join(__dirname, 'views', 'index.html');
    } else if (req.url.slice(-1) === '/') {
      console.log('2');
      filePath = path.join(__dirname, 'views', req.url, 'index.html');
    } else {
      {
        console.log('3');
        filePath = path.join(__dirname, 'views', req.url);
      }
    }
  } else {
    {
      console.log('else 4');
      filePath = path.join(__dirname, req.url);
    }
  }

  console.log(filePath);
});

server.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});

// em.on('log', (msg) => logger(msg));

// em.emit('log', 'testing new');
