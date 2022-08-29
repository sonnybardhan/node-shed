const fs = require('fs');
const path = require('path');

// fs.unlink(path.join(__dirname, 'newLong.txt'), (err) => {
//   if (err) throw err;

//   console.log('Deleted!');
// });

const readStream = fs.createReadStream(
  path.join(__dirname, 'files', 'loremLong.txt'),
  { encoding: 'utf-8' }
);
const writeStream = fs.createWriteStream(
  path.join(__dirname, 'files', 'newLong.txt')
);

// readStream.on('data', (chunk) => {
//   console.log(Math.random());
//   writeStream.write(chunk);
// });

readStream.pipe(writeStream);
