const { createLogger, format, transports } = require('winston');
const morgan = require('morgan');
const config = require('config');

const logFormat = format.printf((info) => {
  if (info.message instanceof Object) {
    info.message = `\n${JSON.stringify(info.message, null, 4)}`;
  }
  return `${info.timestamp}: [${info.level}] ${info.message}`;
});

const logger = createLogger({
  level: config.LOGGER.LOG_LEVEL,
  silent: config.LOGGER.SILENT_LOGGER,
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.colorize(),
    logFormat
  ),
  transports: [
    new transports.Console({
      handleExceptions: true,
    }),
  ],
});

logger.onSuccess = morgan(config.LOGGER.MORGAN_LOG_LEVEL, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message) },
});

logger.onError = morgan(config.LOGGER.MORGAN_LOG_LEVEL, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message) },
});

module.exports = logger;
