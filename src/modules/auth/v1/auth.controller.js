const asyncHandler = require('../../../middlewares/asyncHandler');
const authService = require('./auth.service');
const responses = require('../../../utils/responses');
const AppError = require('../../../utils/appError');

// eslint-disable-next-line no-unused-vars
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const data = authService.login({ email, password });
  return responses.OK(res, data);
});

// eslint-disable-next-line no-unused-vars
exports.initiateSignup = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const data = authService.initiateSignup({ email });
  return responses.OK(res, data);
});

// eslint-disable-next-line no-unused-vars
exports.validateSignupEmail = asyncHandler(async (req, res, next) => {
  const { email, sessionId, password } = req.body;
  const data = authService.validateSignupEmail({ email, sessionId, password });
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
    return next(new AppError('Unable to parse authentication token'));
  }

  const data = authService.validateToken({
    token,
  });
  return responses.OK(res, data);
});

// eslint-disable-next-line no-unused-vars
exports.forgetPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const data = authService.forgetPassword({ email });
  return responses.OK(res, data);
});

// eslint-disable-next-line no-unused-vars
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { email, sessionId, password } = req.body;
  const data = authService.resetPassword({ email, sessionId, password });
  return responses.OK(res, data);
});
