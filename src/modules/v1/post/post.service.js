const {
  Post,
  Comment,
  Like,
  CommentLike,
  Bookmark,
} = require('../../../models');
const APIFeatures = require('../../../commons/apiFeatures');
const AppError = require('../../../commons/appError');
const { getPostFeedData, getCommentsData } = require('./post.util');

exports.createPost = async ({ userId, text, images }) => {
  const post = await Post.create({ entity: userId, text, images });
  const comments = await Comment.create({ post: post._id, comments: [] });
  return { post, comments };
};

exports.getAllPosts = async (query) => {
  const findPosts = new APIFeatures(Post.find(), query).all();
  const posts = await findPosts.query;
  return { posts };
};

exports.getUserFeed = async (query, userId) => {
  const findPosts = new APIFeatures(Post.find(), query).all();
  const posts = await findPosts.query;

  const res = [];
  posts.forEach((post) => {
    res.push(getPostFeedData(post, userId));
  });
  const feedData = await Promise.all(res);

  return { posts: feedData };
};

exports.getPost = async (postId, userId) => {
  const post = await Post.findOne({ _id: postId });

  if (!post) throw new AppError('Post not found!', 404);

  const feedData = await getPostFeedData(post, userId);

  return { post: feedData };
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

exports.removePostLike = async (userId, postId) => {
  await Like.findOneAndDelete({ entity: userId, post: postId });
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

exports.getPostComments = async ({ postId, query, userId }) => {
  const page = query.page * 1 || 1;
  const limit = query.limit * 1 || 20;
  const skip = (page - 1) * limit;
  const comments = await Comment.findOne(
    { post: postId },
    { comments: { $slice: [skip, limit] } }
  );

  const res = [];
  comments.comments.forEach((comment) => {
    res.push(getCommentsData(comment, userId));
  });

  const commentsData = await Promise.all(res);

  return { comments: commentsData };
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

exports.removeCommentLike = async ({ commentId, userId }) => {
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

exports.addBookmark = async (postId, userId) => {
  try {
    await Bookmark.create({ post: postId, entity: userId });
  } catch (err) {
    if (err.code !== 11000) {
      throw err;
    }
  }
  return { postId };
};

exports.removeBookmark = async (postId, userId) => {
  await Bookmark.findOneAndDelete({ entity: userId, post: postId });
  return { postId };
};

exports.getBookmarks = async (userId, query) => {
  const findBookmarks = new APIFeatures(
    Bookmark.find({ entity: userId }),
    query
  ).all();
  const bookmarks = await findBookmarks.query;

  let posts = [];
  bookmarks.forEach((bookmark) => {
    posts.push(Post.findOne({ _id: bookmark.post }));
  });
  posts = await Promise.all(posts);

  const res = [];
  posts.forEach((post) => {
    res.push(getPostFeedData(post, userId, 'post'));
  });
  const feedData = await Promise.all(res);

  return { posts: feedData };
};
