import { apiClient } from '../client'

export const getLoansOverview = () => apiClient.get('/loans/overview')
