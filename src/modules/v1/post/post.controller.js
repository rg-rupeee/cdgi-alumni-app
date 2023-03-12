const asyncHandler = require('../../../middlewares/asyncHandler');
const postService = require('./post.service');
const responses = require('../../../utils/responses');

// eslint-disable-next-line no-unused-vars
exports.createPost = asyncHandler(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { text, images } = req.body;
  const data = await postService.createPost({ userId, text, images });
  return responses.OK(res, data);
});

// eslint-disable-next-line no-unused-vars
exports.getAllPosts = asyncHandler(async (req, res, next) => {
  const { query } = req;
  const data = await postService.getAllPosts(query);
  return responses.OK(res, data);
});

// eslint-disable-next-line no-unused-vars
exports.getUserFeed = asyncHandler(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { query } = req;
  const data = await postService.getUserFeed(query, userId);
  return responses.OK(res, data);
});

// eslint-disable-next-line no-unused-vars
exports.getPost = asyncHandler(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { postId } = req.params;
  const data = await postService.getPost(postId, userId);
  return responses.OK(res, data);
});

// eslint-disable-next-line no-unused-vars
exports.deletePost = asyncHandler(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { postId } = req.params;
  const data = await postService.deletePost(userId, postId);
  return responses.OK(res, data);
});

// eslint-disable-next-line no-unused-vars
exports.likePost = asyncHandler(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { postId } = req.params;
  const data = await postService.likePost(userId, postId);
  return responses.OK(res, data);
});

// eslint-disable-next-line no-unused-vars
exports.getPostLikes = asyncHandler(async (req, res, next) => {
  const { query } = req;
  const { postId } = req.params;
  const data = await postService.getPostLikes(postId, query);
  return responses.OK(res, data);
});

// eslint-disable-next-line no-unused-vars
exports.removePostLike = asyncHandler(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { postId } = req.params;
  const data = await postService.removePostLike(userId, postId);
  return responses.OK(res, data);
});

// eslint-disable-next-line no-unused-vars
exports.addComment = asyncHandler(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { postId } = req.params;
  const { text } = req.body;
  const data = await postService.addComment({ userId, postId, text });
  return responses.OK(res, data);
});

// eslint-disable-next-line no-unused-vars
exports.getPostComments = asyncHandler(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { query } = req;
  const { postId } = req.params;
  const data = await postService.getPostComments({ postId, query, userId });
  return responses.OK(res, data);
});

// eslint-disable-next-line no-unused-vars
exports.deleteComment = asyncHandler(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { postId, commentId } = req.params;
  const data = await postService.deleteComment({ postId, commentId, userId });
  return responses.OK(res, data);
});

// eslint-disable-next-line no-unused-vars
exports.likeComment = asyncHandler(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { postId, commentId } = req.params;
  const data = await postService.likeComment({ postId, commentId, userId });
  return responses.OK(res, data);
});

// eslint-disable-next-line no-unused-vars
exports.removeCommentLike = asyncHandler(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { postId, commentId } = req.params;
  const data = await postService.removeCommentLike({
    postId,
    commentId,
    userId,
  });
  return responses.OK(res, data);
});

// eslint-disable-next-line no-unused-vars
exports.getCommentLikes = asyncHandler(async (req, res, next) => {
  const { query } = req;
  const { postId, commentId } = req.params;
  const data = await postService.getCommentLikes(postId, commentId, query);
  return responses.OK(res, data);
});

// eslint-disable-next-line no-unused-vars
exports.addBookmark = asyncHandler(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { postId } = req.params;
  const data = await postService.addBookmark(postId, userId);
  return responses.OK(res, data);
});

// eslint-disable-next-line no-unused-vars
exports.removeBookmark = asyncHandler(async (req, res, next) => {
  const { _id: userId } = req.user;
  const { postId } = req.params;
  const data = await postService.removeBookmark(postId, userId);
  return responses.OK(res, data);
});

// eslint-disable-next-line no-unused-vars
exports.getBookmarks = asyncHandler(async (req, res, next) => {
  const { query } = req;
  const { _id: userId } = req.user;
  const data = await postService.getBookmarks(userId, query);
  return responses.OK(res, data);
});
