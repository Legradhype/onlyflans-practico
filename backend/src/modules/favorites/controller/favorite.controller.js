const favoriteService = require('../service/favorite.service');
const { sendSuccess } = require('../../../utils/response');
const asyncHandler = require('../../../utils/asyncHandler');

const addFavorite = asyncHandler(async (req, res) => {
  const data = await favoriteService.add(req.user.id, req.params.creatorId);
  return sendSuccess(res, data, 'Añadido a favoritos', 201);
});

const removeFavorite = asyncHandler(async (req, res) => {
  const data = await favoriteService.remove(req.user.id, req.params.creatorId);
  return sendSuccess(res, data, 'Eliminado de favoritos');
});

const getFavorites = asyncHandler(async (req, res) => {
  const data = await favoriteService.getFavorites(req.user.id);
  return sendSuccess(res, data, 'Favoritos obtenidos');
});

module.exports = { addFavorite, removeFavorite, getFavorites };
