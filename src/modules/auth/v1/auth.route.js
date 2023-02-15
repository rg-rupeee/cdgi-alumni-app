const express = require('express');
const validate = require('../../../middlewares/validation.middleware');
const authController = require('./auth.controller');
const authDTO = require('./auth.dto');

const router = express.Router();

router.post('/login', validate(authDTO.login), authController.login);

/**
 * [A] Signup -> Initiate's Signup
 */
router.post(
  '/initiate-signup',
  validate(authDTO.initiateSignup),
  authController.initiateSignup
);

/**
 * Resend OTP -> Signup, Forget Password
 */
router.post(
  '/resend-otp',
  validate(authDTO.resendOTP),
  authController.resendOTP
);

/**
 * [B] Set Password -> Signup, Forget Password
 */
router.post(
  '/set-password',
  validate(authDTO.setPassword),
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
  validate(authDTO.resetPassword),
  authController.resetPassword
);

module.exports = router;
