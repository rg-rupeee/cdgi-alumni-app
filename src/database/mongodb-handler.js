const config = require('config');
const mongoose = require('mongoose');
const { setupModels } = require('../models/index');
const logger = require('../utils/logger');

mongoose.connection.on('disconnected', () => {
  logger.info('MongoDB: Disconnected');
});

mongoose.connection.on('error', () => {
  logger.error('MongoDB: Error connectiong to DB');
});

mongoose.connection.on('reconnected', () => {
  logger.info('MongoDB: Reconnected');
});

mongoose.connection.on('reconnectFailed', () => {
  logger.error('MongoDB: Error Reconnecting');
});

const mongoOptions = {};

let connection;
const connect = async () => {
  try {
    connection = await mongoose.connect(config.DB.MONGO.URI, mongoOptions);
    logger.info('MongoDB: successfully connected to Database');

    setupModels();
    logger.info('MongoDB: Models setup successful');
  } catch (err) {
    logger.error(err);
  }

  return connection;
};

module.exports = { connect };
