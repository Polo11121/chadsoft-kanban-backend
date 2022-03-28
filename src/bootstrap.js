import mongoose from 'mongoose';

import app from './app';
import env from './constants/env';
import logger from './utils/logger';

let server;

mongoose
  .connect(env.MONGODB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    logger.info('Connected to MongoDB');

    server = app.listen(env.PORT, () => {
      logger.info(`Listening to port ${env.PORT}`);
    });
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');

  if (server) {
    server.close();
  }
});
