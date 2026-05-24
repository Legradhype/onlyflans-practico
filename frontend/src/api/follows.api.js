import axiosClient from './axiosClient'

export const followsApi = {
  follow: (creatorId) => axiosClient.post(`/follows/${creatorId}`),
  unfollow: (creatorId) => axiosClient.delete(`/follows/${creatorId}`),
  getMyFollows: () => axiosClient.get('/follows'),
}