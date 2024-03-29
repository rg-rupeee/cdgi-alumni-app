const AppError = require('../commons/appError');
const logger = require('../configs/logger');

const handleCastErrorDB = (err) => {
  const message = `Cast Error! Invalid Value ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  logger.info(err);
  const value = err.message;

  const message = `Duplicate field value. ${value}. Please use another value!`;

  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors}`;
  return new AppError(message, 400);
};

const handleJWTError = () => new AppError('Invalid authentication token.', 401);

const handleJWTExpiredError = () =>
  new AppError('Your authentication token has expired!', 401);

const sendError = (err, req, res) => {
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
    });
  }

  // 2) Send generic message
  return res.status(500).json({
    success: false,
    status: 'error',
    message: 'Some Error Occured at our End!',
  });
};

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  logger.info(err);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = { ...err };
  error.message = err.message;

  if (error.message && error.message.startsWith('Cast')) {
    error = handleCastErrorDB(error);
  }

  if (error.code === 11000) error = handleDuplicateFieldsDB(error);

  if (
    error._message &&
    (error._message.includes('Validation failed') ||
      error._message.includes('validation failed'))
  ) {
    error = handleValidationErrorDB(error);
  }

  if (error.name === 'JsonWebTokenError') error = handleJWTError();

  if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

  sendError(error, req, res);
};
