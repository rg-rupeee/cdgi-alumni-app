const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema(
  {
    entity: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Entity',
    },
    post: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Post',
    },
  },
  { timestamps: true }
);

bookmarkSchema.index({ entity: 1, post: 1 }, { unique: true });

module.exports = bookmarkSchema;
