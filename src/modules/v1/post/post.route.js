const express = require('express');
const validate = require('../../../middlewares/validation.middleware');
const postController = require('./post.controller');
const postDTO = require('./post.dto');
const strictAuthN = require('../../../middlewares/auth/strictAuthN.middleware');
const { Entity } = require('../../../models');

const router = express.Router();

/**
 * Create Post
 */
router.post(
  '/',
  strictAuthN(Entity),
  validate(postDTO.createPost),
  postController.createPost
);

/**
 * Get All Posts
 */
router.get('/', strictAuthN(Entity), postController.getAllPosts);

/**
 * Get Feed
 */
router.get('/feed', strictAuthN(Entity), postController.getUserFeed);

/**
 * Get Post
 */
router.get('/:postId', strictAuthN(Entity), postController.getPost);

/**
 * Delete Post
 */
router.delete('/:postId', strictAuthN(Entity), postController.deletePost);

/**
 * Like Post
 */
router.put('/:postId/like', strictAuthN(Entity), postController.likePost);

/**
 * Get Post Likes
 */
router.get('/:postId/like', strictAuthN(Entity), postController.getPostLikes);

/**
 * Remove Post Like
 */
router.delete(
  '/:postId/like',
  strictAuthN(Entity),
  postController.removePostLike
);

/**
 * Add Comment on Post
 */
router.post(
  '/:postId/comment',
  strictAuthN(Entity),
  validate(postDTO.addComment),
  postController.addComment
);

/**
 * Get Post Comments
 */
router.get(
  '/:postId/comment',
  strictAuthN(Entity),
  postController.getPostComments
);

/**
 * Delete Comment
 */
router.delete(
  '/:postId/comment/:commentId',
  strictAuthN(Entity),
  postController.deleteComment
);

/**
 * Like Comment
 */
router.put(
  '/:postId/comment/:commentId/like',
  strictAuthN(Entity),
  postController.likeComment
);

/**
 * Dislike Comment
 */
router.delete(
  '/:postId/comment/:commentId/like',
  strictAuthN(Entity),
  postController.removeCommentLike
);

/**
 * Get Comment Likes
 */
router.get(
  '/:postId/comment/:commentId/like',
  strictAuthN(Entity),
  postController.getCommentLikes
);

/**
 * Add Bookmark
 */
router.post(
  '/:postId/bookmark',
  strictAuthN(Entity),
  postController.addBookmark
);

/**
 * Remove Bookmark
 */
router.delete(
  '/:postId/bookmark',
  strictAuthN(Entity),
  postController.removeBookmark
);

/**
 * Get All Bookmarks
 */
router.get('/user/bookmark', strictAuthN(Entity), postController.getBookmarks);

module.exports = router;
