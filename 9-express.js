const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const PORT = process.env.PORT || 3500;

const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

//allowing cross origin resource sharing middleware

//create a whitelist (array) of sites that will be permitted
const whiteList = [
  'https://www.somesite.com/',
  'http://localhost:3500/',
  'http://127.0.0.1:5500/',
  'https://www.google.com/',
];

const corsOptions = {
  origin: (origin, callback) => {
    console.log('origin: ', origin);
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      // if (whiteList.indexOf(origin) !== -1) {
      callback(null, true); //first arg if the error (which will be passed in the 'else' block)
      //true, in the 2nd arg in the callback indicates that it is in the whitelist
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

//pass that into the cors method (by default, if you left the cors method empty, it would allow all origins)
app.use(cors(corsOptions));

//custom middleware

//putting this here would make it intercept all the routes beneath it
app.use(logger);

//built-in middleware

//urlencoded is for handling form data
//when data comes into the url as a form, using urlencoded you can pull the data out as params
app.use(express.urlencoded({ extended: false }));

//for json files
app.use(express.json());

//for static files
//all paths in html files should be pointing to static content in this folder
app.use(express.static(path.join(__dirname, '/public')));

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

app.all('*', (req, res) => {
  console.log('made it here', req.url);
  res.status(404);

  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 not found (json)' });
  } else {
    res.type('txt').send('Whoopsie! 404!');
  }
});
// app.get('/*', (req, res) => {
//   res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// });

app.use(errorHandler);

app.listen(PORT, () => console.log(`server running on ${PORT}`));
