import axiosClient from './axiosClient'

export const usersApi = {
  getMe: () => axiosClient.get('/users/me'),
}
