const postRepository = require('../repository/post.repository');
const { Donation, Follow } = require('../../../database');
const { getPaginationParams, paginatedResponse } = require('../../../utils/pagination');

class PostService {
  async create(creatorId, body, file) {
    const data = { creator_id: creatorId };

    if (body.text_content) data.text_content = body.text_content;
    if (file) data.image_url = `/uploads/${file.filename}`;

    if (!data.text_content && !data.image_url) {
      const err = new Error('Posteaje debe tener texto o imagen');
      err.statusCode = 400;
      throw err;
    }

    return postRepository.create(data);
  }

  async getByCreator(creatorId, followerId, query) {
    if (followerId) {
      const donated = await Donation.findOne({
        where: { follower_id: followerId, creator_id: creatorId },
      });
      if (!donated) {
        const err = new Error('Debes donar a este creador para ver sus posts');
        err.statusCode = 403;
        throw err;
      }
    }

    const { page, limit, offset } = getPaginationParams(query);
    const result = await postRepository.findByCreator(creatorId, { limit, offset });
    return paginatedResponse(result, { page, limit });
  }

  async getOwnPosts(creatorId, query) {
    const { page, limit, offset } = getPaginationParams(query);
    const result = await postRepository.findByCreator(creatorId, { limit, offset });
    return paginatedResponse(result, { page, limit });
  }

  async getFeed(followerId, query) {
    const follows = await Follow.findAll({ where: { follower_id: followerId } });
    const creatorIds = follows.map((f) => f.creator_id);

    if (creatorIds.length === 0) {
      return { items: [], pagination: { total: 0, page: 1, limit: 10, totalPages: 0 } };
    }

    const { page, limit, offset } = getPaginationParams(query);
    const result = await postRepository.findFeed(creatorIds, { limit, offset });
    return paginatedResponse(result, { page, limit });
  }
}

module.exports = new PostService();
