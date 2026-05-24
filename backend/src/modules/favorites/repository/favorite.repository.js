const { Favorite, User, CreatorProfile } = require('../../../database');

class FavoriteRepository {
  async add(followerId, creatorId) {
    return Favorite.create({
      follower_id: followerId,
      creator_id: creatorId,
    });
  }

  async remove(followerId, creatorId) {
    return Favorite.destroy({
      where: {
        follower_id: followerId,
        creator_id: creatorId,
      },
    });
  }

  async exists(followerId, creatorId) {
    const record = await Favorite.findOne({
      where: {
        follower_id: followerId,
        creator_id: creatorId,
      },
    });

    return !!record;
  }

  async getFavorites(followerId) {
    const favorites = await Favorite.findAll({
      where: {
        follower_id: followerId,
      },
      include: [
        {
          model: User,
          as: 'creator',
          attributes: {
            exclude: ['password_hash'],
          },
          include: [
            {
              model: CreatorProfile,
              as: 'creatorProfile',
            },
          ],
        },
      ],
    });

    return favorites.map((favorite) => favorite.creator);
  }
}

module.exports = new FavoriteRepository();