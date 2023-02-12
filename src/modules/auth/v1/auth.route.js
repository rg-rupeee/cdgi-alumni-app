const express = require('express');
const validate = require('../../../middlewares/validation.middleware');
const authController = require('./auth.controller');
const authSchema = require('./auth.schema');

const router = express.Router();

router.post('/login', validate(authSchema.login), authController.login);

router.post(
  '/signup/initiate',
  validate(authSchema.initiateSignup),
  authController.initiateSignup
);

router.post(
  '/signup/resend-otp',
  validate(authSchema.resendOTP),
  authController.resendOTP
);

router.post(
  '/signup/validate',
  validate(authSchema.validateSignupEmail),
  authController.validateSignupEmail
);

router.post('/validate-token', authController.validateToken);

router.post(
  '/forget-password',
  validate(authSchema.forgetPassword),
  authController.forgetPassword
);

router.post(
  '/reset-password',
  validate(authSchema.resetPassword),
  authController.resetPassword
);

module.exports = router;
