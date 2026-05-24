const { Comment, User } = require('../../../database');

class CommentRepository {
  async create(data) {
    return Comment.create(data);
  }

  async findByPost(postId, { limit, offset }) {
    return Comment.findAndCountAll({
      where: { post_id: postId },
      limit,
      offset,
      order: [['created_at', 'DESC']],
      include: [{ model: User, as: 'author', attributes: ['id', 'name'] }],
    });
  }
}

module.exports = new CommentRepository();
