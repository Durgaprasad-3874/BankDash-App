import { apiClient } from '../client'

export const getTransactionsOverview = () => apiClient.get('/transactions/overview')

export const getTransactions = (params = {}) => apiClient.get('/transactions', { params })
