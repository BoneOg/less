const BASE_URL = 'http://192.168.1.52:8000'; // Updated to your machine's current local IP

export const AUTH_ENDPOINTS = {
  LOGIN: `${BASE_URL}/api/auth/login/`,
  REGISTER: `${BASE_URL}/api/auth/register/`,
  ME: `${BASE_URL}/api/auth/me/`,
};
