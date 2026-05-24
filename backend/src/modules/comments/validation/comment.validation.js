const { body, param } = require('express-validator');

const createCommentValidation = [
  body('post_id').isUUID().withMessage('post_id must be a UUID'),
  body('content').trim().notEmpty().withMessage('Comment content cannot be empty'),
];

const postIdParam = [
  param('postId').isUUID().withMessage('Post ID must be a UUID'),
];

module.exports = { createCommentValidation, postIdParam };
