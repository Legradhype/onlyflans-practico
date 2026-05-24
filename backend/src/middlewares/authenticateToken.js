const jwt = require('jsonwebtoken');
const { sendError } = require('../utils/response');
const env = require('../config/env');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 'No token provided', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.jwt.secret);
    req.user = decoded; // { id, email, role }
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = authenticateToken;
