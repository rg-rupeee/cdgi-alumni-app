const express = require('express');
<<<<<<< HEAD
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

router.post(
  '/validate-token',
  validate(authSchema.validateToken),
  authController.validateToken
);

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

=======

const router = express.Router();

>>>>>>> e65d61e27dbfdcb1375ad72482d534c82fed1320
module.exports = router;
