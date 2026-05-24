const { Router } = require('express');
const { createPost, getByCreator, getFeed, getOwnPosts } = require('../controller/post.controller');
const authenticateToken = require('../../../middlewares/authenticateToken');
const authorizeRole = require('../../../middlewares/authorizeRole');
const validate = require('../../../middlewares/validate');
const upload = require('../../../middlewares/upload');
const { createPostValidation, creatorIdParam } = require('../validation/post.validation');

const router = Router();

// Creator: create post
router.post(
  '/',
  authenticateToken,
  authorizeRole('CREATOR'),
  upload.single('image'),
  createPostValidation,
  validate,
  createPost
);

// Creator: own posts
router.get('/mine', authenticateToken, authorizeRole('CREATOR'), getOwnPosts);

// Follower: feed
router.get('/feed', authenticateToken, authorizeRole('FOLLOWER'), getFeed);

// Follower: creator's posts (donation-gated)
router.get('/creator/:creatorId', authenticateToken, creatorIdParam, validate, getByCreator);

module.exports = router;
