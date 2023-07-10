const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

exports.searchUser = joi
  .object({
    body: joi.object().keys({
      searchKey: joi.string().required(),
    }),
  })
  .unknown(true);
