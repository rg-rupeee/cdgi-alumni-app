const asyncHandler = require('../../../middlewares/asyncHandler');
const directoryService = require('./directory.service');
const responses = require('../../../utils/responses');

// eslint-disable-next-line no-unused-vars
exports.getUsers = asyncHandler(async (req, res, next) => {
  const { query } = req;
  const data = await directoryService.getUsers(query);
  return responses.OK(res, data);
});

// eslint-disable-next-line no-unused-vars
exports.searchUser = asyncHandler(async (req, res, next) => {
  const { query } = req;
  const { searchKey } = req.body;
  const data = await directoryService.searchUser({ searchKey, query });
  return responses.OK(res, data);
});
