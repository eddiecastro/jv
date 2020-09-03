const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

const { PeopleRouter } = require('./routes');

const config = require('./config');

const PORT = config.port;

const app = express();
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
  app.get('*', (req, res) => {
    res.sendFile('build/index.html', { root: __dirname });
  });
}

app.use('/people', PeopleRouter);
// app.use('*', DefaultRouter);
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    'errors': {
      message: err.message,
      error: {}
    }
  });
});

async function startServer() {
  app.listen(PORT, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Server is running on: ${PORT}`);
  });
}

// Run the async function to start our server
startServer();
