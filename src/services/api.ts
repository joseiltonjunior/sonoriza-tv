import axios from 'axios'

const API = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
})

API.interceptors.request.use(
  (config) => {
    const token = import.meta.env.VITE_API_TOKEN
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default API
