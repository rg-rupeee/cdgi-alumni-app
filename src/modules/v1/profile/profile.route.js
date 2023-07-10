const express = require('express');
const profileController = require('./profile.controller');
const strictAuthN = require('../../../middlewares/auth/strictAuthN.middleware');
const { Entity } = require('../../../models');

const router = express.Router();

/**
 * get profile
 */
router.get('/:entityId', strictAuthN(Entity), profileController.getProfile);

/**
 * update profile
 */
router.patch(
  '/:entityId',
  strictAuthN(Entity),
  profileController.updateProfile,
);

module.exports = router;
