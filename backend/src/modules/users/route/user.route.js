const { Router } = require('express');
const { getMe } = require('../controller/user.controller');
const authenticateToken = require('../../../middlewares/authenticateToken');

const router = Router();

router.get('/me', authenticateToken, getMe);

module.exports = router;
