const { Donation, User } = require('../../../database');
const { Op } = require('sequelize');

class DonationRepository {
  async create(data) {
    return Donation.create(data);
  }

  async getFollowerHistory(followerId, { startDate, endDate, creatorName, limit, offset }) {
    const where = { follower_id: followerId };

    if (startDate || endDate) {
      where.created_at = {};
      if (startDate) where.created_at[Op.gte] = new Date(startDate);
      if (endDate) where.created_at[Op.lte] = new Date(endDate);
    }

    const creatorWhere = { role: 'CREATOR' };
    if (creatorName) {
      creatorWhere.name = { [Op.iLike]: `%${creatorName}%` };
    }

    return Donation.findAndCountAll({
      where,
      limit,
      offset,
      order: [['created_at', 'DESC']],
      include: [
        {
          model: User,
          as: 'creator',
          where: creatorWhere,
          attributes: ['id', 'name', 'email'],
        },
      ],
    });
  }
}

module.exports = new DonationRepository();
