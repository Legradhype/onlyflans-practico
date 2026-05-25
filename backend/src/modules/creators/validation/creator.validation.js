const { body, param, query } = require('express-validator');

const goalValidation = [
  body('title').trim().notEmpty().withMessage('Titulo es requerido').isLength({ max: 255 }),
  body('description').optional().trim(),
];

const updateGoalValidation = [
  param('id').isUUID().withMessage('Goal ID es requerido y debe ser un UUID'),
  body('status').optional().isIn(['ACTIVE', 'COMPLETED']).withMessage('Stado debe ser ACTIVE o COMPLETED'),
  body('title').optional().trim().notEmpty().isLength({ max: 255 }),
];

const incomeReportValidation = [
  query('start_date').optional().isISO8601().withMessage('start_date debe ser una fecha válida'),
  query('end_date').optional().isISO8601().withMessage('end_date debe ser una fecha válida'),
];

const creatorIdParam = [
  param('id').isUUID().withMessage('Creator ID es requerido y debe ser un UUID'),
];

module.exports = { goalValidation, updateGoalValidation, incomeReportValidation, creatorIdParam };
