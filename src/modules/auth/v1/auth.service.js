const { v4: uuidv4 } = require('uuid');
const logger = require('../../../configs/logger');
const {
  generateToken,
  generateOTP,
  getHourDifference,
  sendSignupOTP,
} = require('./auth.util');
const { Entity } = require('../../../models');
const AppError = require('../../../utils/appError');

exports.login = async ({ email, password }) => {
  const user = await Entity.findOne({ email }).select('+password');
  if (!user || !user.active) {
    throw new AppError('User Not Found', 400);
  }
  if (!(await user.correctPassword(password, user.password))) {
    throw new AppError('Password Does Not Match', 401);
  }
  const token = generateToken(user.id);
  return {
    user: {
      _id: user._id,
      emaiL: user.email,
    },
    token,
  };
};

exports.initiateSignup = async ({ email }) => {
  let user = await Entity.findOne({ email });
  if (user?.active) {
    throw new AppError('User Already Exists', 400);
  }

  const otp = generateOTP();
  user = user
    ? await Entity.findOneAndUpdate(
        { email },
        {
          sessionId: uuidv4(),
          sessioInitiate: Date.now(),
          sessionOTP: otp,
        },
        {
          new: true,
          runValidators: true,
        }
      )
    : await Entity.create({
        email,
        sessionId: uuidv4(),
        sessioInitiate: Date.now(),
        sessionOTP: otp,
      });

  sendSignupOTP({ email, otp });

  return {
    id: user._id,
    email: user.email,
    sessionId: user.sessionId,
  };
};

exports.resendOTP = async ({ email, sessionId }) => {
  let user = await Entity.findOne({ email, sessionId });
  if (!user) {
    throw new AppError('Invalid sessionId or User Not Found', 400);
  }

  if (user.resendOTP > 5) {
    throw new AppError('OPT Resend ATTEMPT EXCEED', 400);
  }

  const otp = user.sessionOTP;

  sendSignupOTP({ email, otp });

  await Entity.findOneAndUpdate(
    { email },
    { resendOTP: user.resendOTP + 1 },
    { new: true, runValidators: true }
  );

  return {
    id: user._id,
    email: user.email,
    sessionId: user.sessionId,
  };
};

exports.validateSignupEmail = async ({ email, sessionId, otp, password }) => {
  let user = await Entity.findOne({ email, sessionId });
  if (!user) {
    throw new AppError('Invalid sessionId or User Not Found', 400);
  }

  if (user.active) {
    throw new AppError('User Already Exists', 400);
  }

  // check if session date is greater than 1 day
  const today = new Date();
  const sessionInitiate = new Date(user.sessioInitiate);

  if (getHourDifference(today.getTime(), sessionInitiate.getTime()) > 6) {
    throw new AppError('Session Id Expired', 400);
  }

  // validate session otp
  if (user.sessionOTP !== otp) {
    throw new AppError('Invalid OTP Entered', 400);
  }

  user.password = password;
  user.active = true;
  user.sessionId = undefined;
  user.sessioInitiate = undefined;
  user.sessionOTP = undefined;
  await user.save();

  const token = generateToken(user.id);
  return {
    user: {
      _id: user._id,
      emaiL: user.email,
    },
    token,
  };
};

exports.validateToken = async ({ email }) => {
  logger.info(email);
};

exports.forgetPassword = async ({ email }) => {
  logger.info(email);
};

exports.resetPassword = async ({ email }) => {
  logger.info(email);
};
