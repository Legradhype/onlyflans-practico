import axiosClient from './axiosClient'

export const donationsApi = {
  donate: (data) => axiosClient.post('/donations', data),
  getHistory: (params) => axiosClient.get('/donations/history', { params }),
}
