import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { getPreferences, getProfile } from '../../api/endpoints/settings'
import { useFetch } from '../../hooks/useFetch'
import { Card } from '../../components/common/Card'
import { Tabs } from '../../components/common/Tabs'
import { Skeleton } from '../../components/common/Skeleton'
import { EditProfileForm } from './components/EditProfileForm'
import { PreferencesForm } from './components/PreferencesForm'
import { SecurityForm } from './components/SecurityForm'

const tabs = [
  { id: 'profile', label: 'Edit Profile' },
  { id: 'preferences', label: 'Preferences' },
  { id: 'security', label: 'Security' },
]

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const { data: profile, isLoading: loadingProfile } = useFetch(getProfile, [])
  const { data: preferences, isLoading: loadingPreferences } = useFetch(
    getPreferences,
    [],
  )

  const isLoading = loadingProfile || loadingPreferences

  return (
    <Card>
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="pt-6">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-11" />
            <Skeleton className="h-11" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'profile' && <EditProfileForm profile={profile} />}
              {activeTab === 'preferences' && (
                <PreferencesForm preferences={preferences} />
              )}
              {activeTab === 'security' && <SecurityForm />}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </Card>
  )
}
