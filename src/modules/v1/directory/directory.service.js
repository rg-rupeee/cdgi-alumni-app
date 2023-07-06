const { Profile } = require('../../../models');
const APIFeatures = require('../../../commons/apiFeatures');

exports.getUsers = async (query) => {
  const findUsers = new APIFeatures(Profile.find(), query).all();
  const users = await findUsers.query;
  return { users };
};

exports.searchUser = async ({ searchKey, query }) => {
  const findUsers = new APIFeatures(
    Profile.find({ name: new RegExp(searchKey, 'i') }),
    query,
  ).all();
  const users = await findUsers.query;
  return { users };
};
