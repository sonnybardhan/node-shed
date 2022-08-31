const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const logEvents = async (msg, logName) => {
  const dateTime = format(new Date(), 'dd-MM-yyyy\tHH:mm:ss');
  const logItem = `${dateTime}\t${uuid()}\t${msg}\n`;

  if (!fs.existsSync(path.join(__dirname, '..', 'event-logs'))) {
    await fsPromises.mkdir(path.join(__dirname, '..', 'event-logs'));
  }
  await fsPromises.appendFile(
    path.join(__dirname, '..', 'event-logs', logName),
    logItem
  );
};

const logger = (req, res, next) => {
  console.log(`${req.method}\t${req.headers.origin}\t${req.path}`);
  logEvents(
    `${req.method}\t${req.headers.origin}\t${req.path}`,
    'expressReqLogger.txt'
  );
  next();
};

module.exports = { logger, logEvents };
