import { apiClient } from '../client'

export const getCreditCardsOverview = () => apiClient.get('/credit-cards/overview')
