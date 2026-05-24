/**
 * Extracts and normalizes pagination params from query string.
 * @param {Object} query - req.query
 * @param {number} defaultLimit
 * @returns {{ page, limit, offset }}
 */
const getPaginationParams = (query, defaultLimit = 10) => {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || defaultLimit));
  const offset = (page - 1) * limit;
  return { page, limit, offset };
};

/**
 * Builds a paginated response payload.
 * @param {Object} result - Sequelize findAndCountAll result
 * @param {{ page, limit }} params
 */
const paginatedResponse = (result, { page, limit }) => {
  const totalPages = Math.ceil(result.count / limit);
  return {
    items: result.rows,
    pagination: {
      total: result.count,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
};

module.exports = { getPaginationParams, paginatedResponse };
