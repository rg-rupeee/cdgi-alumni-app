const express = require('express');
const validate = require('../../../middlewares/validation.middleware');
const dashboardController = require('./dashboard.controller');
const { login: loginDTO } = require('../../auth/v1/auth.dto');
const strictAuthN = require('../../../middlewares/auth/strictAuthN.middleware');
const restrict = require('../../../middlewares/auth/authZ.middleware');
const { Entity } = require('../../../models');

const router = express.Router();

router.post('/login', validate(loginDTO), dashboardController.login);

router.post(
  '/users',
  strictAuthN(Entity),
  restrict('admin'),
  dashboardController.addUsers,
);

router.delete(
  '/users',
  strictAuthN(Entity),
  restrict('admin'),
  dashboardController.deleteUser,
);

module.exports = router;
