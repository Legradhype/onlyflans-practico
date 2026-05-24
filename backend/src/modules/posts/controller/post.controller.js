const postService = require('../service/post.service');
const { sendSuccess } = require('../../../utils/response');
const asyncHandler = require('../../../utils/asyncHandler');

const createPost = asyncHandler(async (req, res) => {
  const data = await postService.create(req.user.id, req.body, req.file);
  return sendSuccess(res, data, 'Post created', 201);
});

const getByCreator = asyncHandler(async (req, res) => {
  const followerId = req.user?.role === 'FOLLOWER' ? req.user.id : null;
  const data = await postService.getByCreator(req.params.creatorId, followerId, req.query);
  return sendSuccess(res, data, 'Posts retrieved');
});

const getFeed = asyncHandler(async (req, res) => {
  const data = await postService.getFeed(req.user.id, req.query);
  return sendSuccess(res, data, 'Feed retrieved');
});

const getOwnPosts = asyncHandler(async (req, res) => {
  const data = await postService.getOwnPosts(req.user.id, req.query);
  return sendSuccess(res, data, 'Posts retrieved');
});

module.exports = { createPost, getByCreator, getFeed, getOwnPosts };
