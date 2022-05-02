const compression = require('compression');
const express = require('express');
const helmet = require('helmet');

const env = require('./constants/env');
const routes = require('./routes');

const cors = require('cors');

const app = express();
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://bille-chadsoft-kanban-board.s3-website-us-east-1.amazonaws.com'],
  })
);
// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// serving client files in production
if (env.NODE_ENV === 'production') {
  app.use(express.static('public'));
}

// gzip compression
app.use(compression());

// api routes
app.use('/api', routes);

module.exports = app;
