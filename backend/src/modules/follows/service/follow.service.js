const followRepository = require('../repository/follow.repository');
const { User, Follow } = require('../../../database'); // Añadimos Follow aquí

class FollowService {
  async follow(followerId, creatorId) {
    if (followerId === creatorId) {
      const err = new Error('No puedes seguirte a ti mismo');
      err.statusCode = 400;
      throw err;
    }

    const creator = await User.findOne({ where: { id: creatorId, role: 'CREATOR' } });
    if (!creator) {
      const err = new Error('Creador no encontrado');
      err.statusCode = 404;
      throw err;
    }

    const alreadyFollowing = await followRepository.exists(followerId, creatorId);
    if (alreadyFollowing) {
      const err = new Error('ya sigues a este creador');
      err.statusCode = 409;
      throw err;
    }

    return followRepository.follow(followerId, creatorId);
  }

  async unfollow(followerId, creatorId) {
    const deleted = await followRepository.unfollow(followerId, creatorId);
    if (!deleted) {
      const err = new Error('relacion de seguimiento no encontrada');
      err.statusCode = 404;
      throw err;
    }
    return { message: 'Dejado de seguir exitosamente' };
  }

  async getMyFollows(followerId) {
    const follows = await Follow.findAll({
      where: { follower_id: followerId }
    });
    return follows;
  }
}

module.exports = new FollowService();