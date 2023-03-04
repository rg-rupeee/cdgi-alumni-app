const asyncHandler = require('../asyncHandler');
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

    // if token not present means user not logged in
    if (!token) {
      return next();
    }

    const { user } = await decode(token, model);
    req.user = user;

    return next();
  });

module.exports = protect;
