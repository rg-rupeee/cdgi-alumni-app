const asyncHandler = require('../../../middlewares/asyncHandler');
const dashboardService = require('./dashboard.service');
const { login } = require('../../auth/v1/auth.service');
const responses = require('../../../utils/responses');

// eslint-disable-next-line no-unused-vars
exports.login = asyncHandler(async (req, res, next) => {
  const { email, enrollmentId, password } = req.body;
  const data = await login({ email, enrollmentId, password, checkAdmin: true });
  return responses.OK(res, data);
});

// eslint-disable-next-line no-unused-vars
exports.addUsers = asyncHandler(async (req, res, next) => {
  const { user, body } = req;
  setTimeout(async () => {
    const result = await dashboardService.createUsers({ data: body });
    await dashboardService.sendUserUploadMail({
      user,
      result,
      body,
    });
  }, 0);
  return responses.Send(res, 202, { message: 'request received' });
});

// eslint-disable-next-line no-unused-vars
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { users } = req.body;
  const data = await dashboardService.deleteUser({ users });
  return responses.OK(res, data);
});
