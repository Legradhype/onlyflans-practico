const { Router } = require('express');
const { follow, unfollow, getMyFollows } = require('../controller/follow.controller');
const authenticateToken = require('../../../middlewares/authenticateToken');
const authorizeRole = require('../../../middlewares/authorizeRole');
const validate = require('../../../middlewares/validate');
const { creatorIdParam } = require('../validation/follow.validation');

const router = Router();
router.get('/', authenticateToken, authorizeRole('FOLLOWER'), getMyFollows);

router.post('/:creatorId', authenticateToken, authorizeRole('FOLLOWER'), creatorIdParam, validate, follow);
router.delete('/:creatorId', authenticateToken, authorizeRole('FOLLOWER'), creatorIdParam, validate, unfollow);

module.exports = router;