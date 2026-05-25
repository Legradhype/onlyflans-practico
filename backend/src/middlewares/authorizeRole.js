const { sendError } = require('../utils/response');
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
