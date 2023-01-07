const asyncHandler = require('./asyncHandler');
<<<<<<< HEAD
const logger = require('../configs/logger');
const AppError = require('../utils/appError');

module.exports = (schema, additionalProperties) =>
  asyncHandler(async (req, _res, next) => {
=======
const logger = require('../utils/logger');
const AppError = require('../utils/appError');

module.exports = (schema, additionalProperties) =>
  asyncHandler((req, _res, next) => {
>>>>>>> e65d61e27dbfdcb1375ad72482d534c82fed1320
    const result = schema.validate(req, {
      allowUnknown: false,
      convert: true,
    });

    if (result.error) {
      let additionalLogs = '';
      if (additionalProperties) {
        additionalProperties.forEach((element) => {
          const elementValue = req[element];
          if (element) {
            additionalLogs += ` | ${element}: ${elementValue}`;
          }
        });
      }

      logger.error(
        `Validation Failed: ${result.error.toString()} ${additionalLogs}`
      );

      throw new AppError(`Bad Request: ${result.error.toString()}`, 400);
    }

    Object.assign(req, result.value);
    return next();
  });
