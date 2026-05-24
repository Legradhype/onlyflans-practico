const { Router } = require('express');
const { donate, getHistory } = require('../controller/donation.controller');
const authenticateToken = require('../../../middlewares/authenticateToken');
const authorizeRole = require('../../../middlewares/authorizeRole');
const validate = require('../../../middlewares/validate');
const { donateValidation, historyValidation } = require('../validation/donation.validation');

const router = Router();

router.post('/', authenticateToken, authorizeRole('FOLLOWER'), donateValidation, validate, donate);
router.get('/history', authenticateToken, authorizeRole('FOLLOWER'), historyValidation, validate, getHistory);

module.exports = router;
