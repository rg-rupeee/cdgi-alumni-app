const { Comment, Like } = require('../../../models');

exports.getFeeddata = async (post) => {
  const likes = await Like.countDocuments({ post: post._id });
  const comments = await Comment.findOne({ post: post._id });
  return {
    ...post.toJSON(),
    like: {
      count: likes,
    },
    comment: {
      count: comments?.comments?.length,
    },
  };
};
