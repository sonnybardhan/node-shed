// const fsPromises = require('fs').promises;

const fs = require('fs');
const path = require('path');
const fs_prom = fs.promises;

// const fileOps = async () => {
//   try {
//     let data = await fs_prom.readFile(
//       path.join(__dirname, 'files', 'starter.txt'),
//       'utf-8'
//     );

//     await fs_prom.unlink(path.join(__dirname, 'files', 'lorem.txt'));
//     console.log('lorem.txt deleted ... ');

//     console.log('data: ', data);
//     await fs_prom.appendFile(
//       path.join(__dirname, 'files', 'starter.txt'),
//       'Adding more text here'
//     );
//     console.log('append complete!');

//     data = await fs_prom.readFile(
//       path.join(__dirname, 'files', 'starter.txt'),
//       'utf-8'
//     );
//     console.log('post append: ', data);
//   } catch (error) {
//     console.error(error);
//   }
// };
const fileOps = async () => {
  try {
    await fs_prom.unlink(path.join(__dirname, 'files', 'lorem.txt'));
    console.log('lorem.txt deleted ... ');
  } catch (error) {
    console.error(error);
  }
};

fileOps();
