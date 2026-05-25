const { sendError } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  console.error('[ErrorHandler]', err);

  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    const errors = err.errors.map((e) => ({ field: e.path, message: e.message }));
    return sendError(res, 'Validation failed', 422, errors);
  }

  if (err.name === 'JsonWebTokenError') {
    return sendError(res, 'Invalid token', 401);
  }
  if (err.name === 'TokenExpiredError') {
    return sendError(res, 'Token expired', 401);
  }
  if (err.statusCode) {
    return sendError(res, err.message, err.statusCode, err.errors || null);
  }
  return sendError(res, 'Internal server error', 500);
};

module.exports = errorHandler;
