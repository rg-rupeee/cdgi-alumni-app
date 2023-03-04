const mongoose = require('mongoose');

const commentLikeSchema = new mongoose.Schema(
  {
    entity: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Entity',
    },
    comment: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Post',
    },
  },
  { timestamps: true }
);

commentLikeSchema.index({ comment: 1, entity: 1 }, { unique: true });

module.exports = commentLikeSchema;
