import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

export function Card({ className, hover = false, children, ...props }) {
  return (
    <motion.div
      className={cn(
        'rounded-2xl bg-surface-card p-6 shadow-card',
        hover && 'transition-shadow duration-300 ease-smooth hover:shadow-cardHover',
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function CardHeader({ title, action, className }) {
  return (
    <div
      className={cn(
        'mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <h3 className="text-lg font-semibold text-ink-soft">{title}</h3>
      {action}
    </div>
  )
}
