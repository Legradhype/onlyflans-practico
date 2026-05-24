const authService = require('../service/auth.service');
const { sendSuccess } = require('../../../utils/response');
const asyncHandler = require('../../../utils/asyncHandler');

const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);
  return sendSuccess(res, result, 'Registered successfully', 201);
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);
  return sendSuccess(res, result, 'Logged in successfully');
});

const logout = asyncHandler(async (req, res) => {
  // JWT is stateless; client should discard the token
  return sendSuccess(res, null, 'Logged out successfully');
});

module.exports = { register, login, logout };
