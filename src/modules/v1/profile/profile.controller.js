const asyncHandler = require('../../../middlewares/asyncHandler');
const profileService = require('./profile.service');
const responses = require('../../../utils/responses');

// eslint-disable-next-line no-unused-vars
exports.getProfile = asyncHandler(async (req, res, next) => {
  const { entityId } = req.params;
  const data = await profileService.getProfile(entityId);
  return responses.OK(res, data);
});

// eslint-disable-next-line no-unused-vars
exports.updateProfile = asyncHandler(async (req, res, next) => {
  const { entityId } = req.params;
  const { body } = req;
  const data = await profileService.updateProfile({ entityId, body });
  return responses.OK(res, data);
});
