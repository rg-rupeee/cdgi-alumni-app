const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const asyncHandler = require('../asyncHandler');
const AppError = require('../../utils/appError');

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

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await model.findById(decoded.id);
    if (currentUser != null) {
      req.user = currentUser;
      return next();
    }

    return next(
      new AppError('User belonging to this token does not exists', 401)
    );
  });

module.exports = protect;
