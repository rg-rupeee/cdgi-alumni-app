const express = require('express');
const authController = require('./auth.controller');

const router = express.Router();

router.post('/login', authController.login);

router.post('/signup/initiate', authController.initiateSignup);

router.post('/signup/validate-email', authController.validateSignupEmail);

router.post('/validate-token', authController.validateToken);

router.post('/forget-password', authController.forgetPassword);

router.post('/reset-password', authController.resetPassword);

module.exports = router;
