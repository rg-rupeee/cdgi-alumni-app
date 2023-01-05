const AppError = require('../../utils/appError');

const restrict =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('Forbidden.', 403));
    }
    return next();
  };

module.exports = restrict;
