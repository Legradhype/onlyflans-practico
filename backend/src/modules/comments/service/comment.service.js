const commentRepository = require('../repository/comment.repository');
const { Post, Donation } = require('../../../database');
const { getPaginationParams, paginatedResponse } = require('../../../utils/pagination');

class CommentService {
  async create(userId, role, { post_id, content }) {
    const post = await Post.findByPk(post_id);
    if (!post) {
      const err = new Error('Post not found');
      err.statusCode = 404;
      throw err;
    }
    if (role === 'FOLLOWER') {
      const donated = await Donation.findOne({
        where: { follower_id: userId, creator_id: post.creator_id },
      });
      if (!donated) {
        const err = new Error('Debes enviar flanes a este creador para poder comentar');
        err.statusCode = 403;
        throw err;
      }
    }

    return commentRepository.create({ post_id, user_id: userId, content });
  }
  async getByPost(postId, userId, query) {
    const post = await Post.findByPk(postId);
    if (!post) {
      const err = new Error('Post not found');
      err.statusCode = 404;
      throw err;
    }
    if (post.creator_id !== userId) {
      const err = new Error('Solo el creador puede ver los comentarios de esta publicación');
      err.statusCode = 403; // Forbidden
      throw err;
    }

    const { page, limit, offset } = getPaginationParams(query);
    const result = await commentRepository.findByPost(postId, { limit, offset });
    return paginatedResponse(result, { page, limit });
  }
}

module.exports = new CommentService();