const jwt = require('jsonwebtoken');
const config = require('config');
const constants = require('../../../constants');
const { sendMail } = require('../../../utils/email');
const AppError = require('../../../utils/appError');

exports.generateToken = (id) => {
  const token = jwt.sign({ id }, config.JWT.SECRET, {
    expiresIn: config.JWT.EXPIRY,
  });

  return token;
};

exports.generateOTP = () => Math.floor(100000 + Math.random() * 900000);

exports.getHourDifference = (date1, date2) => Math.abs(date1 - date2) / 3600000;

exports.sendSignupOTP = async ({ otp, email, name }) => {
  const body = constants.OTP.BODY({ name, otp });
  const res = await sendMail({
    userEmail: email,
    userName: name,
    body,
    subject: constants.OTP.SUBJECT,
  });
  if (res.success === false)
    throw new AppError(`Could not send otp. Error: ${res.response}`, 400);

  return res;
};
