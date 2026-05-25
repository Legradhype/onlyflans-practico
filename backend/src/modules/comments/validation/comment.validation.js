const { body, param } = require('express-validator');

const createCommentValidation = [
  body('post_id').isUUID().withMessage('post_id debe ser un UUID válido'),
  body('content').trim().notEmpty().withMessage('Contenido no puede estar vacío'),
];

const postIdParam = [
  param('postId').isUUID().withMessage('Post id tiene que ser un UUID válido'),
];

module.exports = { createCommentValidation, postIdParam };
