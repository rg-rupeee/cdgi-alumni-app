const mongoose = require('mongoose');
const { isEmail } = require('validator');

const profileSchema = new mongoose.Schema(
  {
    entity_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Entity',
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail, 'invalid value: email'],
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = profileSchema;
