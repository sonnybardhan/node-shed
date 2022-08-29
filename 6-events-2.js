const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const logEvents = async (msg) => {
  const dateTime = format(new Date(), 'dd-MM-yyyy\tHH:mm:ss');
  const logItem = `${dateTime}\t${uuid()}\t${msg}\n`;

  if (!fs.existsSync(path.join(__dirname, 'event-logs'))) {
    await fsPromises.mkdir(path.join(__dirname, 'event-logs'));
  }
  await fsPromises.appendFile(
    path.join(__dirname, 'event-logs', 'event-log.txt'),
    logItem
  );
  console.log('Done!');
};

module.exports = logEvents;
