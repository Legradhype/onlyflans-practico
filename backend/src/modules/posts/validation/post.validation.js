const { body, param } = require('express-validator');

const createPostValidation = [
  body('text_content').optional().trim().notEmpty().withMessage('El contenido del texto no puede estar vacío si se proporciona'),
];

const creatorIdParam = [
  param('creatorId').isUUID().withMessage('El ID del creador debe ser un UUID'),
];

module.exports = { createPostValidation, creatorIdParam };
