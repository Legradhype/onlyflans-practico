const userService = require('../service/user.service');
const { sendSuccess } = require('../../../utils/response');
const asyncHandler = require('../../../utils/asyncHandler');

const getMe = asyncHandler(async (req, res) => {
  const user = await userService.getMe(req.user.id);
  return sendSuccess(res, user, 'User retrieved');
});

module.exports = { getMe };
