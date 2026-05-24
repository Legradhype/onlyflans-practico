const { Post, User, Comment, Donation, CreatorProfile } = require('../../../database');
const { Op } = require('sequelize');

class PostRepository {
  async create(data) {
    return Post.create(data);
  }

  async findByCreator(creatorId, { limit, offset }) {
    return Post.findAndCountAll({
      where: { creator_id: creatorId },
      limit,
      offset,
      order: [['created_at', 'DESC']],
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name'],
          include: [{ model: CreatorProfile, as: 'creatorProfile' }],
        },
      ],
    });
  }

  async findFeed(creatorIds, { limit, offset }) {
    return Post.findAndCountAll({
      where: { creator_id: { [Op.in]: creatorIds } },
      limit,
      offset,
      order: [['created_at', 'DESC']],
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name'],
          include: [{ model: CreatorProfile, as: 'creatorProfile' }],
        },
      ],
    });
  }

  async findById(id) {
    return Post.findByPk(id, {
      include: [{ model: User, as: 'creator', attributes: ['id', 'name'] }],
    });
  }

  async delete(id, creatorId) {
    return Post.destroy({ where: { id, creator_id: creatorId } });
  }
}

module.exports = new PostRepository();
