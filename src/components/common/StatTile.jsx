import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

const tones = {
  teal: 'bg-accent-teal/15 text-accent-teal',
  orange: 'bg-accent-orange/15 text-accent-orange',
  pink: 'bg-accent-pink/15 text-accent-pink',
  primary: 'bg-primary-100 text-primary',
  yellow: 'bg-accent-yellow/30 text-accent-orange',
}

export function StatTile({ icon, label, value, tone = 'primary', className }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        'flex items-center gap-4 rounded-2xl bg-surface-card p-5 shadow-card',
        className,
      )}
    >
      <span
        className={cn(
          'flex h-12 w-12 shrink-0 items-center justify-center rounded-full',
          tones[tone],
        )}
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-xs text-ink-muted">{label}</span>
        <span className="block truncate text-lg font-semibold text-ink-soft">
          {value}
        </span>
      </span>
    </motion.div>
  )
}
