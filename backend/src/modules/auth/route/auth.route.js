const { Router } = require('express');
const { register, login, logout } = require('../controller/auth.controller');
const { registerValidation, loginValidation } = require('../validation/auth.validation');
const validate = require('../../../middlewares/validate');
const authenticateToken = require('../../../middlewares/authenticateToken');

const router = Router();

router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.post('/logout', authenticateToken, logout);

module.exports = router;
