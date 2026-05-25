const followService = require('../service/follow.service');
const { sendSuccess } = require('../../../utils/response');
const asyncHandler = require('../../../utils/asyncHandler');

const follow = asyncHandler(async (req, res) => {
  const data = await followService.follow(req.user.id, req.params.creatorId);
  return sendSuccess(res, data, 'Seguido exitosamente', 201);
});

const unfollow = asyncHandler(async (req, res) => {
  const data = await followService.unfollow(req.user.id, req.params.creatorId);
  return sendSuccess(res, data, 'Dejado de seguir exitosamente');
});


const getMyFollows = asyncHandler(async (req, res) => {
  const data = await followService.getMyFollows(req.user.id);
  return sendSuccess(res, data, 'Seguidos obtenidos exitosamente');
});

module.exports = { follow, unfollow, getMyFollows };
