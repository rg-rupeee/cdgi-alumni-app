const {
  Comment,
  Like,
  CommentLike,
  Entity,
  Bookmark,
} = require('../../../models');

exports.getPostFeedData = async (post, userId) => {
  const [entity, likes, comments, isLiked, isBookmarked] = await Promise.all([
    Entity.findOne({ _id: post.entity }).select('name email enrollmentId'),
    Like.countDocuments({ post: post._id }),
    await Comment.findOne({ post: post._id }),
    Like.countDocuments({ post: post._id, entity: userId }),
    await Bookmark.countDocuments({
      post: post._id,
      entity: userId,
    }),
  ]);

  return {
    ...post.toJSON(),
    like: {
      count: likes,
      isLiked: Boolean(isLiked),
    },
    comment: {
      count: comments?.comments?.length || 0,
    },
    owner: {
      entity,
    },
    bookmark: {
      isBookmarked: Boolean(isBookmarked),
    },
  };
};

exports.getCommentsData = async (comment, userId) => {
  const [entity, likes, isLiked] = await Promise.all([
    Entity.findOne({ _id: comment.entity }).select('name email enrollmentId'),
    CommentLike.countDocuments({ comment: comment._id }),
    CommentLike.countDocuments({
      comment: comment._id,
      entity: userId,
    }),
  ]);

  return {
    ...comment.toJSON(),
    like: {
      count: likes,
      isLiked: Boolean(isLiked),
    },
    owner: {
      entity,
    },
  };
};
