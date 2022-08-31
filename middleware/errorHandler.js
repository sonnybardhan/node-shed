const { logEvents } = require('./logger');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  logEvents(`${err.name}: ${err.message}`, 'expressErrorLogs.txt');
  res.status(500).send(err.message);
};

module.exports = errorHandler;
