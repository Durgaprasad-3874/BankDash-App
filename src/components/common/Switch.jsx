import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        'flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200',
        checked ? 'bg-primary justify-end' : 'bg-surface-border justify-start',
      )}
    >
      <motion.span
        layout
        className="h-5 w-5 rounded-full bg-white shadow"
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
      />
    </button>
  )
}
