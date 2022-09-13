const config = require('config');
const { connectDB } = require('./database/index');

async function bootstrap() {
  // handling uncaught exception
  process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! Shutting down...');
    console.log(err.name, err.message);
    console.log(err);
    process.exit(1);
  });

  // database connection
  await connectDB();

  // starting server
  const app = require('./app');
  const server = app.listen(config.APP.PORT, () => {
    console.log(`Server running on port ${config.APP.PORT}`);
  });

  // handling unhandled rejection
  process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! Shutting down...');
    console.log(err);
    server.close(() => {
      process.exit(1);
    });
  });

  // handling sigterm
  process.on('SIGTERM', () => {
    console.log('SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
      console.log('Process terminated!');
    });
  });

  // handling sigint
  process.on('SIGINT', () => {
    console.log('SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
      console.log('Process terminated!');
    });
  });
}

bootstrap();
