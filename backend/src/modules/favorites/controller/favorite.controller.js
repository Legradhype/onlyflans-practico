const favoriteService = require('../service/favorite.service');
const { sendSuccess } = require('../../../utils/response');
const asyncHandler = require('../../../utils/asyncHandler');

const addFavorite = asyncHandler(async (req, res) => {
  const data = await favoriteService.add(req.user.id, req.params.creatorId);
  return sendSuccess(res, data, 'Added to favorites', 201);
});

const removeFavorite = asyncHandler(async (req, res) => {
  const data = await favoriteService.remove(req.user.id, req.params.creatorId);
  return sendSuccess(res, data, 'Removed from favorites');
});

const getFavorites = asyncHandler(async (req, res) => {
  const data = await favoriteService.getFavorites(req.user.id);
  return sendSuccess(res, data, 'Favorites retrieved');
});

module.exports = { addFavorite, removeFavorite, getFavorites };
