const { Profile } = require('../../../models');
const APIFeatures = require('../../../commons/apiFeatures');

exports.getProfile = async (entityId) => {
  const profile = await Profile.findOne({ entity: entityId });
  return { profile };
};

exports.updateProfile = async ({ entityId, body }) => {
  const profile = await Profile.findOneAndUpdate(
    { entity: entityId },
    { ...body },
    { new: true, runValidators: true },
  );
  return { profile };
};
