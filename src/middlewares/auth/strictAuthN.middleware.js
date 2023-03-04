const asyncHandler = require('../asyncHandler');
const AppError = require('../../commons/appError');
const { decode } = require('../../utils/auth');

const protect = (model) =>
  asyncHandler(async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      [, token] = req.headers.authorization.split(' ');
    }

    if (!token) {
      return next(new AppError('Unauthorized', 401));
    }

    const { user } = await decode(token, model);

    req.user = user;

    return next();
  });

module.exports = protect;
