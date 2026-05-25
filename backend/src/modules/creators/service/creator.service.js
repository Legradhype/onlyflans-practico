const creatorRepository = require('../repository/creator.repository');
const { getPaginationParams, paginatedResponse } = require('../../../utils/pagination');
const env = require('../../../config/env');

class CreatorService {
  async getAll(query) {
    const { page, limit, offset } = getPaginationParams(query);
    const result = await creatorRepository.findAll({
      search: query.search,
      limit,
      offset,
    });
    return paginatedResponse(result, { page, limit });
  }

  async getById(id) {
    const creator = await creatorRepository.findById(id);
    if (!creator) {
      const err = new Error('Creador no encontrado');
      err.statusCode = 404;
      throw err;
    }
    return creator;
  }

  async updateProfile(userId, body, files) {
    const data = { ...body };

    if (files?.profile_picture?.[0]) {
      data.profile_picture_url = `/uploads/${files.profile_picture[0].filename}`;
    }
    if (files?.banner?.[0]) {
      data.banner_url = `/uploads/${files.banner[0].filename}`;
    }

    return creatorRepository.upsertProfile(userId, data);
  }

  async createGoal(creatorId, body) {
    return creatorRepository.createGoal({ creator_id: creatorId, ...body });
  }

  async updateGoal(goalId, creatorId, body) {
    const goal = await creatorRepository.findGoalById(goalId);
    if (!goal) {
      const err = new Error('Goal no encontrado');
      err.statusCode = 404;
      throw err;
    }
    if (goal.creator_id !== creatorId) {
      const err = new Error('Acceso denegado');
      err.statusCode = 403;
      throw err;
    }
    return creatorRepository.updateGoal(goalId, body);
  }

  async getGoals(creatorId) {
    return creatorRepository.findGoalsByCreator(creatorId);
  }

  async getIncomeReport(creatorId, query) {
    const donations = await creatorRepository.getDonationReport(creatorId, {
      startDate: query.start_date,
      endDate: query.end_date,
    });

    const totalFlans = donations.reduce((sum, d) => sum + d.quantity, 0);
    return { donations, totalFlans };
  }
}

module.exports = new CreatorService();
