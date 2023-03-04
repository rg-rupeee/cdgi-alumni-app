const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema(
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

likeSchema.index({ post: 1, entity: 1 }, { unique: true });

module.exports = likeSchema;
