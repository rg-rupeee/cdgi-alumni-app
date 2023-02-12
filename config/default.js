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
  JWT: {
    SECRET: process.env.JWT_SECRET,
    EXPIRY: process.env.JWT_EXPIRY,
  },
  EMAIL: {
    SENDER: {
      NAME: process.env.EMAIL_SENDER_NAME,
      EMAILID: process.env.EMAIL_SENDER_EMAILID,
    },
    SENDINBLUE: {
      URI: process.env.SENDINBLUE_API_URI,
      API_KEY: process.env.SENDINBLUE_API_KEY,
    },
  },
};

module.exports = config;
