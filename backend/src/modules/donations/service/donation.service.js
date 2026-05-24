const donationRepository = require('../repository/donation.repository');
const { User } = require('../../../database');
const { getPaginationParams, paginatedResponse } = require('../../../utils/pagination');

class DonationService {
  async donate(followerId, { creator_id, quantity, support_type }) {
    if (followerId === creator_id) {
      const err = new Error('Cannot donate to yourself');
      err.statusCode = 400;
      throw err;
    }

    const creator = await User.findOne({ where: { id: creator_id, role: 'CREATOR' } });
    if (!creator) {
      const err = new Error('Creator not found');
      err.statusCode = 404;
      throw err;
    }

    return donationRepository.create({
      follower_id: followerId,
      creator_id,
      quantity,
      support_type: support_type || 'FLAN',
    });
  }

  async getHistory(followerId, query) {
    const { page, limit, offset } = getPaginationParams(query);
    const result = await donationRepository.getFollowerHistory(followerId, {
      startDate: query.start_date,
      endDate: query.end_date,
      creatorName: query.creator_name,
      limit,
      offset,
    });
    return paginatedResponse(result, { page, limit });
  }
}

module.exports = new DonationService();
