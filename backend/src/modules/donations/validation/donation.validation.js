const { body, query } = require('express-validator');

const donateValidation = [
  body('creator_id').isUUID().withMessage('creator_id debe ser un UUID válido'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity debe ser un entero positivo'),
  body('support_type').optional().isString().withMessage('support_type debe ser una cadena de texto'),
];

const historyValidation = [
  query('start_date').optional().isISO8601().withMessage('start_date no es una fecha válida'),
  query('end_date').optional().isISO8601().withMessage('end_date no es una fecha válida'),
  query('creator_name').optional().isString().withMessage('creator_name debe ser una cadena de texto'),
];

module.exports = { donateValidation, historyValidation };
