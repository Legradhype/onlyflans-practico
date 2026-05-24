const { sendError } = require('../utils/response');

/**
 * Factory that returns a middleware allowing only the specified roles.
 * @param {...string} roles - Allowed roles (e.g. 'CREATOR', 'FOLLOWER')
 */
const authorizeRole = (...roles) => (req, res, next) => {
  if (!req.user) {
    return sendError(res, 'Unauthenticated', 401);
  }
  if (!roles.includes(req.user.role)) {
    return sendError(res, 'Forbidden: insufficient role', 403);
  }
  return next();
};

module.exports = authorizeRole;
