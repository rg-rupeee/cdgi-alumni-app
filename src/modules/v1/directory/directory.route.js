const express = require('express');
const directoryController = require('./directory.controller');
const strictAuthN = require('../../../middlewares/auth/strictAuthN.middleware');
const { Entity } = require('../../../models');
const validate = require('../../../middlewares/validation.middleware');
const directoryDTO = require('./directory.dto');

const router = express.Router();

/**
 * Get all users
 */
router.get('/', strictAuthN(Entity), directoryController.getUsers);

/**
 * Search user
 */
router.post(
  '/search',
  strictAuthN(Entity),
  validate(directoryDTO.searchUser),
  directoryController.searchUser,
);

module.exports = router;
