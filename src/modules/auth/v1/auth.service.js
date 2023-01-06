const logger = require('../../../configs/logger');

exports.login = ({ email }) => {
  logger.info(email);
};

exports.initiateSignup = ({ email }) => {
  logger.info(email);
};

exports.validateSignupEmail = ({ email }) => {
  logger.info(email);
};

exports.validateToken = ({ email }) => {
  logger.info(email);
};

exports.forgetPassword = ({ email }) => {
  logger.info(email);
};

exports.resetPassword = ({ email }) => {
  logger.info(email);
};
