const config = require('config');
const { connectDB } = require('./database/index');
const logger = require('./utils/logger');

async function bootstrap() {
  // handling uncaught exception
  process.on('uncaughtException', (err) => {
    logger.error('UNCAUGHT EXCEPTION! Shutting down...');
    logger.error(err.name, err.message);
    logger.error(err);
    process.exit(1);
  });

  // database connection
  await connectDB();

  // starting server
  const app = require('./app');
  const server = app.listen(config.APP.PORT, () => {
    logger.info(`Server running on port ${config.APP.PORT}`);
  });

  // handling unhandled rejection
  process.on('unhandledRejection', (err) => {
    logger.info('UNHANDLED REJECTION! Shutting down...');
    logger.error(err);
    server.close(() => {
      process.exit(1);
    });
  });

  // handling sigterm
  process.on('SIGTERM', () => {
    logger.error('SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
      logger.info('Process terminated!');
    });
  });

  // handling sigint
  process.on('SIGINT', () => {
    logger.error('SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
      logger.info('Process terminated!');
    });
  });
}

bootstrap();
