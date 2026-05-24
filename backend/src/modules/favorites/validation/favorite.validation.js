const { param } = require('express-validator');

const creatorIdParam = [
  param('creatorId').isUUID().withMessage('Creator ID must be a UUID'),
];

module.exports = { creatorIdParam };
