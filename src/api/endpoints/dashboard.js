import { apiClient } from '../client'

export const getDashboardOverview = () => apiClient.get('/dashboard/overview')
