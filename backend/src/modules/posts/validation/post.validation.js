const { body, param } = require('express-validator');

const createPostValidation = [
  body('text_content').optional().trim().notEmpty().withMessage('Text content cannot be empty if provided'),
];

const creatorIdParam = [
  param('creatorId').isUUID().withMessage('Creator ID must be a UUID'),
];

module.exports = { createPostValidation, creatorIdParam };
