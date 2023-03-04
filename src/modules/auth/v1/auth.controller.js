const asyncHandler = require('../../../middlewares/asyncHandler');
const authService = require('./auth.service');
const responses = require('../../../utils/responses');
const AppError = require('../../../commons/appError');

// eslint-disable-next-line no-unused-vars
exports.login = asyncHandler(async (req, res, next) => {
  const { email, enrollmentId, password } = req.body;
  const data = await authService.login({ email, enrollmentId, password });
  return responses.OK(res, data);
});

// eslint-disable-next-line no-unused-vars
exports.initiateSignup = asyncHandler(async (req, res, next) => {
  const { email, enrollmentId, name } = req.body;
  const data = await authService.initiateSignup({ email, enrollmentId, name });
  return responses.OK(res, data);
});

// eslint-disable-next-line no-unused-vars
exports.resendOTP = asyncHandler(async (req, res, next) => {
  const { email, sessionId } = req.body;
  const data = await authService.resendOTP({ email, sessionId });
  return responses.OK(res, data);
});

// eslint-disable-next-line no-unused-vars
exports.setPassword = asyncHandler(async (req, res, next) => {
  const { email, sessionId, otp, password } = req.body;
  const data = await authService.setPassword({
    email,
    sessionId,
    otp,
    password,
  });
  return responses.OK(res, data);
});

exports.validateToken = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    [, token] = req.headers.authorization.split(' ');
  }

  if (!token) {
    return next(new AppError('Unable to parse authentication token', 400));
  }

  const data = await authService.validateToken({
    token,
  });
  return responses.OK(res, data);
});

// eslint-disable-next-line no-unused-vars
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const data = await authService.resetPassword({ email });
  return responses.OK(res, data);
});
