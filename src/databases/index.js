const config = require('config');
const mongoDB = require('./mongoDB');
const logger = require('../configs/logger');

const connection = {};

const connectDB = async () => {
  if (config.DB.MONGO) {
    connection.mongo = await mongoDB.connect();
  } else {
    logger.error('Mongo DB: Configuration not available in config');
  }

  return connection;
};

const disconnectDB = async () => {
  if (connection.mongo) {
    await connection.mongo.close();
  }
};

module.exports = { connection, connectDB, disconnectDB };
