import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { SidebarNav } from './SidebarNav'
import { IconButton } from '../common/IconButton'

export function DesktopSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-70 shrink-0 border-r border-surface-border bg-surface-card px-6 py-8 md:flex">
      <SidebarNav />
    </aside>
  )
}

export function MobileSidebarDrawer({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-ink/40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-y-0 left-0 z-50 w-72 bg-surface-card px-6 py-8 shadow-cardHover md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >
            <div className="mb-4 flex justify-end">
              <IconButton label="Close navigation" onClick={onClose}>
                <X size={20} />
              </IconButton>
            </div>
            <SidebarNav onNavigate={onClose} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
