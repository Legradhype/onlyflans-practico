const { body, query } = require('express-validator');

const donateValidation = [
  body('creator_id').isUUID().withMessage('creator_id must be a UUID'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
  body('support_type').optional().isString().withMessage('support_type must be a string'),
];

const historyValidation = [
  query('start_date').optional().isISO8601().withMessage('start_date must be a valid date'),
  query('end_date').optional().isISO8601().withMessage('end_date must be a valid date'),
  query('creator_name').optional().isString(),
];

module.exports = { donateValidation, historyValidation };
