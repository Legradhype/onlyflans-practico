const { body, param, query } = require('express-validator');

const goalValidation = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 255 }),
  body('description').optional().trim(),
];

const updateGoalValidation = [
  param('id').isUUID().withMessage('Goal ID must be a UUID'),
  body('status').optional().isIn(['ACTIVE', 'COMPLETED']).withMessage('Status must be ACTIVE or COMPLETED'),
  body('title').optional().trim().notEmpty().isLength({ max: 255 }),
];

const incomeReportValidation = [
  query('start_date').optional().isISO8601().withMessage('start_date must be a valid date'),
  query('end_date').optional().isISO8601().withMessage('end_date must be a valid date'),
];

const creatorIdParam = [
  param('id').isUUID().withMessage('Creator ID must be a UUID'),
];

module.exports = { goalValidation, updateGoalValidation, incomeReportValidation, creatorIdParam };
