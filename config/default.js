const config = {
  APP: {
    PORT: process.env.PORT || '5000',
  },
  DB: {
    MONGO: {
      URI: process.env.MONGODB_URI,
    },
  },
  LOGGER: {
    LOG_LEVEL: process.env.LOG_LEVEL,
    MORGAN_LOG_LEVEL: process.env.MORGAN_LOG_LEVEL,
    SILENT_LOGGER: Boolean(process.env.SILENT_LOGGER === 'true'),
  },
};

module.exports = config;
