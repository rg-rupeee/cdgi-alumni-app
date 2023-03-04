const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

exports.createPost = joi
  .object({
    body: joi
      .object()
      .keys({
        text: joi.string(),
        images: joi.array().items(joi.string()).min(1),
      })
      .or('images', 'text')
      .unknown(false),
  })
  .unknown(true);

exports.addComment = joi
  .object({
    body: joi
      .object()
      .keys({
        text: joi.string().required(),
      })
      .unknown(false),
  })
  .unknown(true);
