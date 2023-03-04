const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const AppError = require('../../commons/appError');

exports.decode = async (token, model) => {
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await model.findById(decoded.id);
  if (currentUser) {
    return { valid: true, user: currentUser };
  }

  throw new AppError('User belonging to this token does not exists', 401);
};
