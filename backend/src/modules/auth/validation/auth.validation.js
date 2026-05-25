const { body } = require('express-validator');

const registerValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('role')
    .isIn(['CREATOR', 'FOLLOWER'])
    .withMessage('Role must be either CREATOR or FOLLOWER'),
];

const loginValidation = [
  body('email').isEmail().withMessage('email es requerido y debe ser válido'),
  body('password').notEmpty().withMessage('Contraseña es requerida'),
];

module.exports = { registerValidation, loginValidation };
