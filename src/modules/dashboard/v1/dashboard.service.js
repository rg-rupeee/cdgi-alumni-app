const { Entity, Profile } = require('../../../models');
const { serializeError } = require('../../../utils/error');
const { sendMail } = require('../../../utils/email');

exports.createUsers = async ({ data }) => {
  const createUser = async (user) => {
    const entity = await Entity.create(user);
    const userProfileData = Object.assign(user, { entity: entity._id });
    const profile = await Profile.create(userProfileData);
    return {
      entity,
      profile,
    };
  };
  const logs = await Promise.allSettled(
    data?.users.map((user) => createUser(user)) || [],
  );
  return logs;
};

exports.sendUserUploadMail = async ({ user, body, result }) => {
  let success = 0;
  let fail = 0;
  const logs = result.map((result) => {
    result.status === 'fulfilled' ? success++ : fail++;
    return {
      status: result.status,
      ...(result.status === 'rejected'
        ? { error: serializeError(result.reason) }
        : {}),
      ...(result.status === 'fulfilled' ? { message: result.value } : {}),
    };
  });
  await sendMail({
    userName: user.name,
    userEmail: user.email,
    body: `processed users data upload request. Success: ${success} Fail: ${fail}`,
    subject: 'User Data Upload Finished',
    attachment: [
      {
        content: btoa(JSON.stringify(body)),
        name: 'data.txt',
      },
      {
        content: btoa(JSON.stringify(logs)),
        name: 'logs.txt',
      },
    ],
  });
};

exports.deleteUser = async ({ users }) => {
  await Promise.all(
    users.map(async ({ enrollmentId }) => {
      await Entity.findOneAndDelete({ enrollmentId });
      await Profile.findOneAndDelete({ enrollmentId });
    }),
  );
  return { users };
};
