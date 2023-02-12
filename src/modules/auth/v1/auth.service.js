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
const { decode } = require('../../../utils/auth');

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

exports.initiateSignup = async ({ email, name }) => {
  let user = await Entity.findOne({ email });
  if (user?.active) {
    throw new AppError('User Already Exists', 400);
  }

  const otp = generateOTP();
  user = user
    ? await Entity.findOneAndUpdate(
        { email },
        {
          name,
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
        name,
        sessionId: uuidv4(),
        sessioInitiate: Date.now(),
        sessionOTP: otp,
      });

  await sendSignupOTP({ email, name, otp });

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

  const today = new Date();
  const sessionInitiate = new Date(user.sessioInitiate);
  if (getHourDifference(today.getTime(), sessionInitiate.getTime()) > 1) {
    throw new AppError('Session Id Expired', 400);
  }

  const otp = user.sessionOTP;

  await sendSignupOTP({ email, otp, name: user.name });

  await Entity.findOneAndUpdate(
    { email },
    { resendOTP: user.resendOTP + 1 },
    { new: true, runValidators: true }
  );

  return {
    id: user._id,
    email: user.email,
    name: user.name,
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
  if (getHourDifference(today.getTime(), sessionInitiate.getTime()) > 1) {
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

exports.validateToken = async ({ token }) => {
  const { user } = await decode(token, Entity);
  return user;
};

exports.forgetPassword = async ({ email }) => {
  logger.info(email);
};

exports.resetPassword = async ({ email }) => {
  logger.info(email);
};
