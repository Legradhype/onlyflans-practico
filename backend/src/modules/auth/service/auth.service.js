const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../../users/repository/user.repository');
const env = require('../../../config/env');
class AuthService {
  async register({ email, password, name, role }) {
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      const err = new Error('Email already in use');
      err.statusCode = 409;
      throw err;
    }

    const password_hash = await bcrypt.hash(password, 12);
    const user = await userRepository.create({ email, password_hash, name, role });
    const token = this._signToken(user);

    return { token, user: this._sanitize(user) };
  }

  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 401;
      throw err;
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      const err = new Error('Invalid credentials');
      err.statusCode = 401;
      throw err;
    }

    const token = this._signToken(user);
    return { token, user: this._sanitize(user) };
  }

  _signToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      env.jwt.secret,
      { expiresIn: env.jwt.expiresIn }
    );
  }

  _sanitize(user) {
    const { password_hash, ...rest } = user.toJSON();
    return rest;
  }
}

module.exports = new AuthService();
