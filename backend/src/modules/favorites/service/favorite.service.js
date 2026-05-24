const favoriteRepository = require('../repository/favorite.repository');
const { User } = require('../../../database');

class FavoriteService {
  async add(followerId, creatorId) {
    if (followerId === creatorId) {
      const err = new Error('Cannot favorite yourself');
      err.statusCode = 400;
      throw err;
    }

    const creator = await User.findOne({ where: { id: creatorId, role: 'CREATOR' } });
    if (!creator) {
      const err = new Error('Creator not found');
      err.statusCode = 404;
      throw err;
    }

    const alreadyFavorited = await favoriteRepository.exists(followerId, creatorId);
    if (alreadyFavorited) {
      const err = new Error('Already in favorites');
      err.statusCode = 409;
      throw err;
    }

    return favoriteRepository.add(followerId, creatorId);
  }

  async remove(followerId, creatorId) {
    const deleted = await favoriteRepository.remove(followerId, creatorId);
    if (!deleted) {
      const err = new Error('Favorite not found');
      err.statusCode = 404;
      throw err;
    }
    return { message: 'Removed from favorites' };
  }

  async getFavorites(followerId) {
    return favoriteRepository.getFavorites(followerId);
  }
}

module.exports = new FavoriteService();
