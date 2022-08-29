const fs = require('fs');
const path = require('path');

if (!fs.existsSync(path.join(__dirname, 'files', 'dirY'))) {
  fs.mkdir(path.join(__dirname, 'files', 'dirY'), (err) => {
    if (err) throw err;

    console.log('dir created');
  });
} else {
  fs.rmdir(path.join(__dirname, 'files', 'dirY'), (err) => {
    if (err) throw err;

    console.log('Folder deleted!');
  });
}

//reading nested files
// fs.readFile(
//   path.join(__dirname, 'files', 'dirY', 'test.txt'),
//   'utf-8',
//   (err, data) => {
//     if (err) throw err;

//     console.log(data);
//   }
// );
