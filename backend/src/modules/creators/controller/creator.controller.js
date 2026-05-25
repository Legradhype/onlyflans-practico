const creatorService = require('../service/creator.service');
const { sendSuccess } = require('../../../utils/response');
const asyncHandler = require('../../../utils/asyncHandler');

const getAll = asyncHandler(async (req, res) => {
  const data = await creatorService.getAll(req.query);
  return sendSuccess(res, data, 'Creadores obtenidos exitosamente');
});

const getById = asyncHandler(async (req, res) => {
  const data = await creatorService.getById(req.params.id);
  return sendSuccess(res, data, 'Creador obtenido exitosamente');
});

const updateProfile = asyncHandler(async (req, res) => {
  const data = await creatorService.updateProfile(req.user.id, req.body, req.files);
  return sendSuccess(res, data, 'Perfil actualizado exitosamente');
});

const createGoal = asyncHandler(async (req, res) => {
  const data = await creatorService.createGoal(req.user.id, req.body);
  return sendSuccess(res, data, 'Goal creado exitosamente', 201);
});

const updateGoal = asyncHandler(async (req, res) => {
  const data = await creatorService.updateGoal(req.params.id, req.user.id, req.body);
  return sendSuccess(res, data, 'Goal actualizado exitosamente');
});

const getIncomeReport = asyncHandler(async (req, res) => {
  const data = await creatorService.getIncomeReport(req.user.id, req.query);
  return sendSuccess(res, data, 'Reporte de ingresos obtenido exitosamente');
});

module.exports = { getAll, getById, updateProfile, createGoal, updateGoal, getIncomeReport };
