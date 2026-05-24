const { Follow, User } = require('../../../database');

class FollowRepository {
  async follow(followerId, creatorId) {
    return Follow.create({ follower_id: followerId, creator_id: creatorId });
  }

  async unfollow(followerId, creatorId) {
    return Follow.destroy({ where: { follower_id: followerId, creator_id: creatorId } });
  }

  async exists(followerId, creatorId) {
    const record = await Follow.findOne({ where: { follower_id: followerId, creator_id: creatorId } });
    return !!record;
  }

  async getFollowers(creatorId) {
    return Follow.findAll({ where: { creator_id: creatorId } });
  }

  async getFollowing(followerId) {
    return Follow.findAll({ where: { follower_id: followerId } });
  }
}

module.exports = new FollowRepository();
