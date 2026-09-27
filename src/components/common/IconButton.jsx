import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export function IconButton({ className, active = false, children, label, ...props }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.92 }}
      aria-label={label}
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded-full text-ink-muted transition-colors duration-200 ease-smooth hover:bg-surface-field hover:text-ink',
        active && 'bg-primary-50 text-primary',
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
}
