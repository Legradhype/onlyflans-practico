import axiosClient from './axiosClient'

export const commentsApi = {
  create: (data) => axiosClient.post('/comments', data),
  getByPost: (postId, params) => axiosClient.get(`/comments/post/${postId}`, { params }),
}
