const followService = require('../service/follow.service');
const { sendSuccess } = require('../../../utils/response');
const asyncHandler = require('../../../utils/asyncHandler');

const follow = asyncHandler(async (req, res) => {
  const data = await followService.follow(req.user.id, req.params.creatorId);
  return sendSuccess(res, data, 'Followed successfully', 201);
});

const unfollow = asyncHandler(async (req, res) => {
  const data = await followService.unfollow(req.user.id, req.params.creatorId);
  return sendSuccess(res, data, 'Unfollowed successfully');
});


const getMyFollows = asyncHandler(async (req, res) => {
  const data = await followService.getMyFollows(req.user.id);
  return sendSuccess(res, data, 'Follows retrieved successfully');
});

module.exports = { follow, unfollow, getMyFollows };
