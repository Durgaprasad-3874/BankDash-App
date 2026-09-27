import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="Tabs"
      className="flex gap-6 border-b border-surface-border"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative pb-3 text-sm font-medium transition-colors',
              isActive ? 'text-primary' : 'text-ink-muted hover:text-ink',
            )}
          >
            {tab.label}
            {isActive && (
              <motion.span
                layoutId="tabs-underline"
                className="absolute -bottom-px left-0 right-0 h-0.5 rounded-full bg-primary"
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
