const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Entity',
    },
    text: {
      type: String,
    },
    images: [String],
  },
  { timestamps: true }
);

module.exports = postSchema;
