import axiosClient from './axiosClient'

export const favoritesApi = {
  add: (creatorId) => axiosClient.post(`/favorites/${creatorId}`),
  remove: (creatorId) => axiosClient.delete(`/favorites/${creatorId}`),
  getAll: () => axiosClient.get('/favorites'),
}
