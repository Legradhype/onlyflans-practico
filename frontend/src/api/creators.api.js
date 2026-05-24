import axiosClient from './axiosClient'

export const creatorsApi = {
  getAll: (params) => axiosClient.get('/creators', { params }),
  getById: (id) => axiosClient.get(`/creators/${id}`),
  updateProfile: (formData) =>
    axiosClient.put('/creators/profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  createGoal: (data) => axiosClient.post('/creators/goals', data),
  updateGoal: (id, data) => axiosClient.patch(`/creators/goals/${id}`, data),
  getIncomeReport: (params) => axiosClient.get('/creators/income-report', { params }),
}
