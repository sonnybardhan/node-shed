const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3500;

// app.get('/', (req, res) => {
app.get('^/$|/index(.html)?', (req, res) => {
  //accepts regex as a valid arg
  // res.send('Hello world!');
  // res.sendFile('./views/index.html', { root: __dirname });
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {
  // res.send('Hello world!');
  // res.sendFile('./views/index.html', { root: __dirname });
  res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?', (req, res) => {
  // res.redirect('/new-page.html');
  res.redirect(301, '/new-page.html'); //setting status code, express would default status code to 304
});

// app.get('/*', (req, res) => {
//   res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// });
app.get(
  '/hello(.html)?',
  (req, res, next) => {
    console.log('attemped to go to hello.html ... ');

    next();
  },
  (req, res) => {
    res.send('Hello there!');
  }
);

const fn1 = (req, res, next) => {
  console.log('hello from fn1');
  next();
};
const fn2 = (req, res, next) => {
  console.log('hello from fn2');
  next();
};
const fn3 = (req, res, next) => {
  console.log('hello from fn3');
  // res.send('Hello from fn3, ends here');
  // res.send('Hello from fn3 ... ');
  next();
};

app.get('/middleware', [fn1, fn2, fn3], (req, res) => {
  res.send('actually, it ends here!');
});

app.get('/*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => console.log(`server running on ${PORT}`));
