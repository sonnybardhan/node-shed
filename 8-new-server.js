const http = require('http');
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');
const fsPromises = fs.promises;

const emitter = new EventEmitter();

emitter.on('log', (msg, fileName) => logger(msg, fileName));

const logger = require('./6-events-2');

const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, res) => {
  const encoding = contentType.includes('image') ? '' : 'utf8';
  const status = !filePath.includes('404.html') ? 200 : 404;
  try {
    const rawData = await fsPromises.readFile(filePath, encoding);
    const data =
      contentType === 'application/json' ? JSON.parse(rawData) : rawData;
    res.writeHead(status, { 'Content-Type': contentType });
    res.end(
      contentType === 'application/json' ? JSON.stringify(data) : rawData
    );
  } catch (err) {
    console.error('oops! ', err);
    emitter.emit('log', `${err.name}\t${err.message}`, 'errLog.txt');

    res.statusCode = 500;
    res.end();
  }
};

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  let ext = path.extname(req.url);

  emitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');

  let contentType;
  let filePath;

  switch (ext) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.txt':
      contentType = 'text/plain';
      break;
    case '.jpg':
      contentType = 'image/jpeg';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    default:
      contentType = 'text/html';
  }

  if (contentType === 'text/html') {
    if (req.url === '/index.html') {
      filePath = path.join(__dirname, 'views', 'index.html');
    } else if (req.url.slice(-1) === '/') {
      filePath = path.join(__dirname, 'views', req.url, 'index.html');
    } else {
      filePath = path.join(__dirname, 'views', req.url);
    }
  } else {
    filePath = path.join(__dirname, req.url);
  }

  if (!ext && req.url.slice(-1) !== '/') {
    filePath += '.html';
  }

  if (fs.existsSync(filePath)) {
    serveFile(filePath, contentType, res);
  } else {
    const base = path.parse(filePath).base;

    switch (base) {
      case 'old.html':
        res.writeHead(301, { Location: '/new-page.html' });
        res.end();
        break;
      case 'some-other.html':
        res.writeHead(301, { Location: '/' });
        res.end();
        break;
      default:
        serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
    }
  }
});

server.listen(PORT, () => console.log(`serving on port ${PORT}`));
