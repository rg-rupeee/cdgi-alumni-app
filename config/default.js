const config = {
  APP: {
    PORT: process.env.PORT || '5000',
  },
  DB: {
    MONGO: {
      URI: process.env.MONGODB_URI,
    },
  },
};

module.exports = config;
