// const math = require('./math.js');
const { add, subtract } = require('./math.js');

// console.log(math.add(1, 2));
console.log(subtract(1, 2));

const os = require('os');
const { extname } = require('path');
const path = require('path');

console.log(os);

console.log(os.type());
// Darwin

console.log(os.version());
// Darwin Kernel Version 21.5.0: Tue Apr 26 21:08:22 PDT 2022; root:xnu-8020.121.3~4/RELEASE_X86_64

console.log(os.homedir());
// /Users/sonny

console.log(__filename);
// //  /Users/sonny/Desktop/backend/node-practice/server.js

console.log(__dirname);
// /Users/sonny/Desktop/backend/node-practice

console.log(path.dirname(__filename));
// /Users/sonny/Desktop/backend

console.log(path.basename(__filename));
// server.js

console.log(path.extname(__filename));
// .js

// combined
console.log(path.parse(__filename));
// {
//   root: '/',
//   dir: '/Users/sonny/Desktop/backend/node-practice',
//   base: 'server.js',
//   ext: '.js',
//   name: 'server'
// }
