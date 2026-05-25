const { param } = require('express-validator');

const creatorIdParam = [
  param('creatorId').isUUID().withMessage('Creador debe ser un UUID válido'),
];

module.exports = { creatorIdParam };
