const { Router } = require('express');
const { createComment, getByPost } = require('../controller/comment.controller');
const authenticateToken = require('../../../middlewares/authenticateToken');
const validate = require('../../../middlewares/validate');
const { createCommentValidation, postIdParam } = require('../validation/comment.validation');

const router = Router();

router.post('/', authenticateToken, createCommentValidation, validate, createComment);
router.get('/post/:postId', authenticateToken, postIdParam, validate, getByPost);

module.exports = router;
