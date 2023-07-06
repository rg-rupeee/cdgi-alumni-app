const mongoose = require('mongoose');
const { isEmail } = require('validator');
const educationSchema = require('./education.schema');
const experienceSchema = require('./experience.schema');
const linkSchema = require('./link.schema');

const profileSchema = new mongoose.Schema(
  {
    entity: {
      type: mongoose.Types.ObjectId,
      ref: 'Entity',
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, 'invalid value: email'],
    },
    enrollmentId: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    headline: {
      type: String,
    },
    about: {
      type: String,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    experience: [
      {
        type: experienceSchema,
      },
    ],
    education: [
      {
        type: educationSchema,
      },
    ],
    links: [
      {
        type: linkSchema,
      },
    ],
  },
  { timestamps: true },
);

profileSchema.index({ email: 1 });
profileSchema.index({ enrollmentId: 1 });

module.exports = profileSchema;
