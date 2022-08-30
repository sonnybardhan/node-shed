const logger = require('./6-events-2');

const EventEmitter = require('events');

class Emitter extends EventEmitter {}

const em = new Emitter();

em.on('log', (msg) => logger(msg));

em.emit('log', 'testing new');

/**
 * folders to create - css, data, img, logs, views
 */
