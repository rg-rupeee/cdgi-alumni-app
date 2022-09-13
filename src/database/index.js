const config = require('config');
const mongoDB = require('./mongodb-handler');

let connection = {};

const connectDB = async () => {
  if (config.DB.MONGO) {
    connection.mongo = await mongoDB.connect();
  } else {
    console.log('Mongo DB: Configuration not available in config');
  }

  return connection;
};

const disconnectDB = async () => {
  if (connection.mongo) {
    await connection.mongo.close();
  }
};

module.exports = { connection, connectDB, disconnectDB };
