import { apiClient } from '../client'

export const getInvestmentsOverview = () => apiClient.get('/investments/overview')
