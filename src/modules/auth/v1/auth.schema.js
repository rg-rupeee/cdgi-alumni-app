const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

exports.login = joi
  .object({
    body: joi.object().keys({
      email: joi.string().required(),
      password: joi.string().required(),
    }),
  })
  .unknown(true);

exports.initiateSignup = joi
  .object({
    body: joi.object().keys({
      email: joi.string().required(),
      name: joi.string().required(),
    }),
  })
  .unknown(true);

exports.resendOTP = joi
  .object({
    body: joi.object().keys({
      email: joi.string().required(),
      sessionId: joi.string().required(),
    }),
  })
  .unknown(true);

exports.validateSignupEmail = joi
  .object({
    body: joi.object().keys({
      email: joi.string().required(),
      sessionId: joi.string().required(),
      otp: joi.string().required(),
      password: joi.string().required(),
    }),
  })
  .unknown(true);

exports.forgetPassword = joi
  .object({
    body: joi.object().keys({
      email: joi.string().required(),
    }),
  })
  .unknown(true);

exports.resetPassword = joi
  .object({
    body: joi.object().keys({
      email: joi.string().required(),
      password: joi.string().required(),
      sessionId: joi.string().required(),
    }),
  })
  .unknown(true);
