const logger = require('./6-events-2');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const em = new MyEmitter();

em.on('log', (msg) => logger(msg));

em.emit('log', 'testing new');
