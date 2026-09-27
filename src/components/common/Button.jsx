import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-600 shadow-sm',
  secondary: 'bg-surface-field text-ink-soft hover:bg-surface-border',
  outline: 'border border-surface-border text-ink-soft hover:bg-surface-field',
  ghost: 'text-ink-soft hover:bg-surface-field',
  danger: 'bg-danger text-white hover:bg-red-600',
}

const sizes = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-sm',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  icon,
  children,
  ...props
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.15 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 ease-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </motion.button>
  )
}
