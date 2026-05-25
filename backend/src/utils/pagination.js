
const getPaginationParams = (query, defaultLimit = 10) => {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || defaultLimit));
  const offset = (page - 1) * limit;
  return { page, limit, offset };
};

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
