const userRepository = require('../repository/user.repository');

class UserService {
  async getMe(id) {
    const user = await userRepository.findById(id);
    if (!user) {
      const err = new Error('User not found');
      err.statusCode = 404;
      throw err;
    }
    const { password_hash, ...rest } = user.toJSON();
    return rest;
  }
}

module.exports = new UserService();
