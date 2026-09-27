import { apiClient } from '../client'

export const getServicesOverview = () => apiClient.get('/services/overview')
