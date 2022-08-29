const fs = require('fs');
const path = require('path');

// fs.readFile(
//   path.join(__dirname, 'files', 'starter.txt'),
//   'utf-8',
//   (err, data) => {
//     if (err) throw err;

//     console.log(data);
//   }
// );

// fs.readFile(
//   path.join(__dirname, 'files', 'starter.txt'),
//   'utf-8',
//   (err, data) => {
//     // fs.readFile('./files/lorem.txt', 'utf-8', (err, data) => {
//     if (err) throw err;

//     console.log(data);
//   }
// );

//writing to a file
// fs.writeFile(
//   path.join(__dirname, 'files', 'newFile.txt'),
//   'My messsage to the world ... ',
//   (err) => {
//     if (err) throw err;
//     console.log('Write complete!');
//   }
// );

fs.appendFile(
  path.join(__dirname, 'files', 'anotherFile.txt'),
  ' ... even more',
  (err) => {
    if (err) throw err;
    console.log('append complete');

    fs.rename(
      path.join(__dirname, 'files', 'anotherFile.txt'),
      path.join(__dirname, 'files', 'renamed.txt'),
      (err) => {
        if (err) throw err;
        console.log('renamed!');
      }
    );
  }
);

process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error: ', err);
  process.exit(1);
});

console.log('testing');
