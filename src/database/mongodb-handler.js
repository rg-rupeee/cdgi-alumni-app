const config = require('config');
const mongoose = require('mongoose');
const { setupModels } = require('../models/index');

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB: Disconnected');
});

mongoose.connection.on('error', () => {
  console.log('MongoDB: Error connectiong to DB');
});

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB: Reconnected');
});

mongoose.connection.on('reconnectFailed', () => {
  console.log('MongoDB: Error Reconnecting');
});

const mongoOptions = {};

let connection;
const connect = async () => {
  try {
    connection = await mongoose.connect(config.DB.MONGO.URI, mongoOptions);
    console.log('MongoDB: successfully connected to Database');

    setupModels();
    console.log('MongoDB: Models setup successful');
  } catch (err) {
    console.log(err);
  }

  return connection;
};

module.exports = { connect };
