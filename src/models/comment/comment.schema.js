const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Post',
    },
    comments: [
      {
        entity: {
          type: mongoose.Types.ObjectId,
          required: true,
          ref: 'Entity',
        },
        text: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

commentSchema.index({ post: 1 });

module.exports = commentSchema;
