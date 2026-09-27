import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { DesktopSidebar, MobileSidebarDrawer } from './Sidebar'
import { Topbar } from './Topbar'
import { PageWrapper } from './PageWrapper'

export function AppLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="flex min-h-screen bg-surface-page">
      <DesktopSidebar />
      <MobileSidebarDrawer open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onOpenMenu={() => setMobileNavOpen(true)} />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <PageWrapper key={location.pathname}>
              <Outlet />
            </PageWrapper>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
