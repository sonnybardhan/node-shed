const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
// console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));
// console.log(uuid());

// const logEvents = async (msg) => {
//   const dateTime = format(new Date(), 'dd-MM-yyyy\tHH:mm:ss');
//   const logItem = `${dateTime}\t${uuid()}\t${msg}\n`;
//   console.log(logItem);

//   try {
//     if (!fs.existsSync(path.join(__dirname, 'logs'))) {
//       await fsPromises.mkdir(path.join(__dirname, 'logs'));
//     }
//     await fsPromises.appendFile(
//       path.join(__dirname, 'logs', 'eventLog.txt'),
//       logItem
//     );
//     console.log('Logged!');
//   } catch (err) {
//     console.error(err);
//   }
// };

// module.exports = logEvents;

//====//====//====//====//====//====//====//====//

//bring in dependences
//bring in core modules
//create logEvents function
//format message with date-fns
//check if dir exists
//if not,
//create
//if it does,
//append to the existing file

//====//====//====//====//====//====//====//====//

//import logEvents in index file
//import EventEmitter core module
//create MyEmitter class that extends EventEmitter
//create myEmitter instance
//set an eventlistener 'on' myEmitter for 'log'
//'emit' a message to myEmitter
