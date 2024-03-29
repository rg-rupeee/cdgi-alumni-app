const mongoose = require('mongoose');

const entitySchema = require('./entity/entity.schema');
const postSchema = require('./post/post.schema');
const likeSchema = require('./like/like.schema');
const commentSchema = require('./comment/comment.schema');
const commentLikeSchema = require('./comment-like/comment-like.schema');
const bookmarkSchema = require('./bookmark/bookmark.schema');
const profileSchema = require('./profile/profile.schema');

exports.Entity = mongoose.model('Entity', entitySchema);
exports.Post = mongoose.model('Post', postSchema);
exports.Like = mongoose.model('Like', likeSchema);
exports.Comment = mongoose.model('Comment', commentSchema);
exports.CommentLike = mongoose.model('CommentLike', commentLikeSchema);
exports.Bookmark = mongoose.model('Bookmark', bookmarkSchema);
exports.Profile = mongoose.model('Profile', profileSchema);
