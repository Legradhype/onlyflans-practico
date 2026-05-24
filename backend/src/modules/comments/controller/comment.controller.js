const commentService = require('../service/comment.service');
const { sendSuccess } = require('../../../utils/response');
const asyncHandler = require('../../../utils/asyncHandler');

const createComment = asyncHandler(async (req, res) => {
  const data = await commentService.create(req.user.id, req.user.role, req.body);
  return sendSuccess(res, data, 'Comentario creado', 201);
});

const getByPost = asyncHandler(async (req, res) => {
  const data = await commentService.getByPost(req.params.postId, req.user.id, req.query);
  return sendSuccess(res, data, 'Comentarios obtenidos');
});

module.exports = { createComment, getByPost };