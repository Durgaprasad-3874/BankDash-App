import { apiClient } from '../client'

export const getProfile = () => apiClient.get('/settings/profile')
export const updateProfile = (data) => apiClient.put('/settings/profile', data)

export const getPreferences = () => apiClient.get('/settings/preferences')
export const updatePreferences = (data) => apiClient.put('/settings/preferences', data)
