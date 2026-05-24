import axiosClient from './axiosClient'

export const postsApi = {
  create: (formData) =>
    axiosClient.post('/posts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  getFeed: (params) => axiosClient.get('/posts/feed', { params }),
  getByCreator: (creatorId, params) => axiosClient.get(`/posts/creator/${creatorId}`, { params }),
  getMine: (params) => axiosClient.get('/posts/mine', { params }),
}
