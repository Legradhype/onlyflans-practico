const authService = require('../service/auth.service');
const { sendSuccess } = require('../../../utils/response');
const asyncHandler = require('../../../utils/asyncHandler');

const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);
  return sendSuccess(res, result, 'Registrado exitosamente', 201);
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);
  return sendSuccess(res, result, 'Loggueado exitosamente');
});

const logout = asyncHandler(async (req, res) => {
  return sendSuccess(res, null, 'Sesión cerrada exitosamente');
});

module.exports = { register, login, logout };
