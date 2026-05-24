const { User, CreatorProfile, CreatorGoal, Donation } = require('../../../database');
const { Op } = require('sequelize');

class CreatorRepository {
  async findAll({ search, limit, offset }) {
    const where = { role: 'CREATOR' };
    if (search) {
      where.name = { [Op.iLike]: `%${search}%` };
    }
    return User.findAndCountAll({
      where,
      include: [{ model: CreatorProfile, as: 'creatorProfile' }],
      limit,
      offset,
      order: [['name', 'ASC']],
      attributes: { exclude: ['password_hash'] },
    });
  }

  async findById(id) {
    return User.findOne({
      where: { id, role: 'CREATOR' },
      include: [
        { model: CreatorProfile, as: 'creatorProfile' },
        { model: CreatorGoal, as: 'goals' } 
      ],
      attributes: { exclude: ['password_hash'] },
    });
  }

  async upsertProfile(userId, data) {
    const [profile] = await CreatorProfile.upsert({ user_id: userId, ...data });
    return profile;
  }

  async createGoal(data) {
    return CreatorGoal.create(data);
  }

  async findGoalById(id) {
    return CreatorGoal.findByPk(id);
  }

  async updateGoal(id, data) {
    const goal = await CreatorGoal.findByPk(id);
    if (!goal) return null;
    return goal.update(data);
  }

  async findGoalsByCreator(creatorId) {
    return CreatorGoal.findAll({ where: { creator_id: creatorId }, order: [['created_at', 'DESC']] });
  }

  async getDonationReport(creatorId, { startDate, endDate }) {
    const where = { creator_id: creatorId };
    if (startDate || endDate) {
      where.created_at = {};
      if (startDate) where.created_at[Op.gte] = new Date(startDate);
      if (endDate) where.created_at[Op.lte] = new Date(endDate);
    }
    return Donation.findAll({
      where,
      include: [{ model: User, as: 'follower', attributes: ['id', 'name', 'email'] }],
      order: [['created_at', 'DESC']],
    });
  }
}

module.exports = new CreatorRepository();