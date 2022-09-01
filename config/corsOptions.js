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
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = {
  whiteList,
  corsOptions,
};
