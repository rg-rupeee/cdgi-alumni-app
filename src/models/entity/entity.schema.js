const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const entitySchema = new mongoose.Schema(
  {
<<<<<<< HEAD
    email: {
      type: String,
      required: true,
      unique: true,
=======
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
>>>>>>> e65d61e27dbfdcb1375ad72482d534c82fed1320
      validate: [isEmail, 'invalid value: email'],
    },
    password: {
      type: String,
<<<<<<< HEAD
      select: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    sessionId: String,
    sessioInitiate: Date,
    sessionOTP: String,
    resendOTP: {
      type: Number,
      default: 0,
=======
      required: true,
>>>>>>> e65d61e27dbfdcb1375ad72482d534c82fed1320
    },
    passwordChangedAt: Date,
    passwordResetOTP: Number,
    passwordResetExpires: Date,
    passwordResetAttempts: Number,
  },
  { timestamps: true }
);

<<<<<<< HEAD
entitySchema.index({ email: 1 });

=======
>>>>>>> e65d61e27dbfdcb1375ad72482d534c82fed1320
entitySchema.pre('save', async function (next) {
  // If password is not modified return
  if (!this.isModified('password')) return next();

  // Hash the password
  this.password = await bcrypt.hash(this.password, 8);

  return next();
});

entitySchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  this.passwordChangedAt = Date.now() - 1000;
<<<<<<< HEAD
  return next();
=======
  next();
>>>>>>> e65d61e27dbfdcb1375ad72482d534c82fed1320
});

entitySchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

entitySchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

module.exports = entitySchema;
