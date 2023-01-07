const jwt = require('jsonwebtoken');
const config = require('config');
const logger = require('../../../configs/logger');

exports.generateToken = (id) => {
  const token = jwt.sign({ id }, config.JWT.SECRET, {
    expiresIn: config.JWT.EXPIRY,
  });

  return token;
};

exports.generateOTP = () => Math.floor(100000 + Math.random() * 900000);

exports.getHourDifference = (date1, date2) => Math.abs(date1 - date2) / 3600000;

exports.sendSignupOTP = async ({ otp, email }) => {
  try {
    console.log(otp);
    console.log(email);
  } catch (err) {
    logger.error(err);
  }
};
