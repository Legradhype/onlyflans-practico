const { Router } = require('express');
const { addFavorite, removeFavorite, getFavorites } = require('../controller/favorite.controller');
const authenticateToken = require('../../../middlewares/authenticateToken');
const authorizeRole = require('../../../middlewares/authorizeRole');
const validate = require('../../../middlewares/validate');
const { creatorIdParam } = require('../validation/favorite.validation');

const router = Router();

router.post('/:creatorId', authenticateToken, authorizeRole('FOLLOWER'), creatorIdParam, validate, addFavorite);
router.delete('/:creatorId', authenticateToken, authorizeRole('FOLLOWER'), creatorIdParam, validate, removeFavorite);
router.get('/', authenticateToken, authorizeRole('FOLLOWER'), getFavorites);

module.exports = router;
