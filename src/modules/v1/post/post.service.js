const { Post, Comment, Like, CommentLike } = require('../../../models');
const APIFeatures = require('../../../commons/apiFeatures');
const AppError = require('../../../commons/appError');

exports.createPost = async ({ userId, text, images }) => {
  const post = await Post.create({ user: userId, text, images });
  const comments = await Comment.create({ post: post._id, comments: [] });
  return { post, comments };
};

exports.getAllPosts = async (query) => {
  const findPosts = new APIFeatures(Post.find(), query).all();
  const posts = await findPosts.query;
  return { posts };
};

exports.getUserFeed = async (query) => {
  const findPosts = new APIFeatures(Post.find(), query).all();
  const posts = await findPosts.query;
  return { posts };
};

exports.getPost = async (postId) => {
  const post = await Post.findOne({ _id: postId });
  return { post };
};

exports.deletePost = async (userId, postId) => {
  const post = await Post.findOneAndDelete({ _id: postId, userId });

  if (!post)
    throw new AppError('User unauthorized to perform this action', 403);

  await Comment.findOneAndDelete({ post: postId });

  return { postId };
};

exports.likePost = async (userId, postId) => {
  const post = await Post.findOne({ _id: postId, userId });

  if (!post) throw new AppError('Post not found!', 404);

  try {
    await Like.create({ entity: userId, post: postId });
  } catch (err) {
    if (err.code !== 11000) {
      throw err;
    }
  }

  return { postId };
};

exports.getPostLikes = async (postId, query) => {
  const findLikes = new APIFeatures(
    Like.find({ post: postId }).select('-_id -post -updatedAt -__v'),
    query
  ).paginate();
  const likes = await findLikes.query;
  return { likes };
};

exports.removePostLike = async (userId, postId) => {
  const post = await Post.findOne({ _id: postId, userId });

  if (!post) throw new AppError('Post not found!', 404);

  await Like.findOneAndDelete({ entity: userId, post: postId });

  return { postId };
};

exports.addComment = async ({ userId, postId, text }) => {
  const comments = await Comment.findOne({ postId });

  if (!comments) throw new AppError('Post not found!', 404);

  const updatedComments = await Comment.findOneAndUpdate(
    { post: postId },
    {
      $push: {
        comments: {
          entity: userId,
          text,
        },
      },
    },
    { new: true, runValidators: true }
  );

  return { comments: updatedComments };
};

exports.getPostComments = async (postId, query) => {
  const findComments = new APIFeatures(
    Comment.findOne({ post: postId }),
    query
  ).paginate();
  const comments = await findComments.query;
  return { comments };
};

exports.deleteComment = async ({ postId, commentId, userId }) => {
  const comments = await Comment.findOne({ postId });

  if (!comments) throw new AppError('Post not found!', 404);

  const comment = comments.comments.find((each) => each._id.equals(commentId));

  if (!comment) throw new AppError('Comment Not found!', 404);

  if (!comment.entity.equals(userId))
    throw new AppError('User unauthorized to perform this action', 403);

  await Comment.findOneAndUpdate(
    { postId },
    { $pull: { comments: { _id: comment._id } } },
    { runValidators: true }
  );

  return { commentId };
};

exports.likeComment = async ({ postId, commentId, userId }) => {
  const comments = await Comment.findOne({ postId });

  if (!comments) throw new AppError('Post not found!', 404);

  const comment = comments.comments.find((each) => each._id.equals(commentId));

  if (!comment) throw new AppError('Comment Not found!', 404);

  try {
    await CommentLike.create({ comment: commentId, entity: userId });
  } catch (err) {
    if (err.code !== 11000) {
      throw err;
    }
  }

  return { commentId };
};

exports.removeCommentLike = async ({ postId, commentId, userId }) => {
  const comments = await Comment.findOne({ postId });

  if (!comments) throw new AppError('Post not found!', 404);

  const comment = comments.comments.find((each) => each._id.equals(commentId));

  if (!comment) throw new AppError('Comment Not found!', 404);

  await CommentLike.findOneAndDelete({ entity: userId, comment: commentId });

  return { commentId };
};

exports.getCommentLikes = async (postId, commentId, query) => {
  const comments = await Comment.findOne({ postId });

  if (!comments) throw new AppError('Post not found!', 404);

  const findLikes = new APIFeatures(
    CommentLike.find({ comment: commentId }).select(
      '-_id -post -updatedAt -__v'
    ),
    query
  ).paginate();
  const likes = await findLikes.query;
  return { likes };
};
