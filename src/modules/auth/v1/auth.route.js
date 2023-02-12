const express = require('express');
const validate = require('../../../middlewares/validation.middleware');
const authController = require('./auth.controller');
const authSchema = require('./auth.schema');

const router = express.Router();

router.post('/login', validate(authSchema.login), authController.login);

/**
 * [A] Signup -> Initiate's Signup
 */
router.post(
  '/initiate-signup',
  validate(authSchema.initiateSignup),
  authController.initiateSignup
);

/**
 * Resend OTP -> Signup, Forget Password
 */
router.post(
  '/resend-otp',
  validate(authSchema.resendOTP),
  authController.resendOTP
);

/**
 * [B] Set Password -> Signup, Forget Password
 */
router.post(
  '/set-password',
  validate(authSchema.setPassword),
  authController.setPassword
);

/**
 * Validate Auth Token
 */
router.post('/validate-token', authController.validateToken);

/**
 * [A] Reset Password -> Forget Password
 */
router.post(
  '/reset-password',
  validate(authSchema.resetPassword),
  authController.resetPassword
);

module.exports = router;
