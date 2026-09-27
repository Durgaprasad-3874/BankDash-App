import axios from 'axios'

export const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error.response?.data ?? error),
)
