const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://192.168.18.7:8000/api'

export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login/`,
  REGISTER: `${API_BASE_URL}/auth/register/`,
  ME: `${API_BASE_URL}/auth/me/`,
}
