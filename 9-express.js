const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const PORT = process.env.PORT || 3500;

const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

app.use(cors(corsOptions));

app.use(logger);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));

//routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/employees', require('./routes/api/employees'));

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

app.use(errorHandler);

app.listen(PORT, () => console.log(`server running on ${PORT}`));
