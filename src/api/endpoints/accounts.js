import { apiClient } from '../client'

export const getAccountsOverview = () => apiClient.get('/accounts/overview')
