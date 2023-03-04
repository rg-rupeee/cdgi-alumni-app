const asyncHandler = require('./asyncHandler');
const logger = require('../configs/logger');
const AppError = require('../commons/appError');

module.exports = (schema, additionalProperties) =>
  asyncHandler(async (req, _res, next) => {
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
