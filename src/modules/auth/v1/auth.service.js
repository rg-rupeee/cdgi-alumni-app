const {
  generateToken,
  generateOTP,
  getHourDifference,
  sendSignupOTP,
  encryptOTP,
  decryptOTP,
} = require('./auth.util');
const { Entity } = require('../../../models');
const AppError = require('../../../commons/appError');
const { decode } = require('../../../utils/auth');
const { generateUUID } = require('../../../utils/crypto');

exports.login = async ({ email, enrollmentId, password }) => {
  const user = await Entity.findOne({
    $or: [{ email }, { enrollmentId }],
  }).select('+password');

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
      email: user.email,
      enrollmentId: user.enrollmentId,
    },
    token,
  };
};

exports.initiateSignup = async ({ email, enrollmentId, name }) => {
  let user = await Entity.findOne({ email, enrollmentId });
  if (user?.active) {
    throw new AppError('User Already Exists', 400);
  }

  const otp = generateOTP();
  const hashedOtp = encryptOTP(otp);
  user = user
    ? await Entity.findOneAndUpdate(
        { email, enrollmentId },
        {
          name,
          sessionId: generateUUID(),
          sessioInitiate: Date.now(),
          sessionOTP: hashedOtp,
        },
        {
          new: true,
          runValidators: true,
        }
      )
    : await Entity.create({
        email,
        enrollmentId,
        name,
        sessionId: generateUUID(),
        sessioInitiate: Date.now(),
        sessionOTP: hashedOtp,
      });

  await sendSignupOTP({ email, name, otp });

  return {
    id: user._id,
    email: user.email,
    sessionId: user.sessionId,
    enrollmentId: user.enrollmentId,
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

  const otp = decryptOTP(user.sessionOTP);

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

exports.setPassword = async ({ email, sessionId, otp, password }) => {
  let user = await Entity.findOne({ email, sessionId });
  if (!user) {
    throw new AppError('Invalid sessionId or User Not Found', 400);
  }

  // check if session date is greater than 1 hour
  const today = new Date();
  const sessionInitiate = new Date(user.sessioInitiate);
  if (getHourDifference(today.getTime(), sessionInitiate.getTime()) > 1) {
    throw new AppError('Session Id Expired', 400);
  }

  // validate session otp
  if (user.sessionOTP !== encryptOTP(otp)) {
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

exports.resetPassword = async ({ email }) => {
  let user = await Entity.findOne({ email });
  if (!user || !user.active) {
    throw new AppError('User Not Found', 400);
  }

  const otp = generateOTP();
  const hashedOtp = encryptOTP(otp);
  user = await Entity.findOneAndUpdate(
    { email },
    {
      sessionId: generateUUID(),
      sessioInitiate: Date.now(),
      sessionOTP: hashedOtp,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  await sendSignupOTP({ email, name: user.name, otp });

  return {
    id: user._id,
    email: user.email,
    sessionId: user.sessionId,
  };
};
