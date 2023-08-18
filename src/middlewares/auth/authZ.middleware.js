const AppError = require('../../commons/appError');

const restrict =
  (...roles) =>
  (req, _res, next) => {
    const authorized = req.user?.roles?.some((role) => {
      return roles.includes(role);
    });

    if (!authorized) {
      return next(new AppError('Forbidden.', 403));
    }

    return next();
  };

module.exports = restrict;
