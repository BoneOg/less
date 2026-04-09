import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Points to our Django backend
  headers: {
    'Content-Type': 'application/json',
  },
})

// Automatically add JWT token to requests if we are logged in
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default api
