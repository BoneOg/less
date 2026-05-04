import api from '../../../api/axios'

export const authService = {
  login: async (credentials: any) => {
    const response = await api.post('/auth/login/', credentials)
    return response.data
  },

  register: async (userData: any) => {
    const response = await api.post('/auth/register/', userData)
    return response.data
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me/')
    return response.data
  },

  updateProfile: async (userData: any) => {
    const response = await api.patch('/auth/me/', userData)
    return response.data
  },

  changePassword: async (passwordData: any) => {
    const response = await api.put('/auth/change-password/', passwordData)
    return response.data
  },

  deleteAccount: async () => {
    const response = await api.delete('/auth/me/')
    return response.data
  }
}
