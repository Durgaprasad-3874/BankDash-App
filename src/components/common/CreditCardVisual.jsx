import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'
import { formatCurrency } from '../../utils/format'

const variantStyles = {
  dark: 'bg-gradient-to-br from-primary-gradientFrom to-primary-gradientTo text-white',
  light: 'border border-surface-border bg-surface-card text-ink',
  gradient: 'bg-gradient-to-br from-accent-teal to-primary text-white',
  outline: 'border-2 border-dashed border-surface-border bg-surface-field text-ink-soft',
}

function ChipIcon({ className }) {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" className={className}>
      <rect x="0.5" y="0.5" width="8" height="15" rx="4" fill="currentColor" />
      <rect x="13.5" y="0.5" width="8" height="15" rx="4" fill="currentColor" />
    </svg>
  )
}

function NetworkMark({ className }) {
  return (
    <svg width="36" height="20" viewBox="0 0 36 20" fill="none" className={className}>
      <circle cx="13" cy="10" r="9" fill="currentColor" fillOpacity="0.6" />
      <circle cx="23" cy="10" r="9" fill="currentColor" fillOpacity="0.35" />
    </svg>
  )
}

export function CreditCardVisual({ card, className }) {
  const isDark = card.variant === 'dark' || card.variant === 'gradient'

  return (
    <motion.div
      whileHover={{ y: -4, rotate: -0.4 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        'flex min-w-[260px] flex-col justify-between rounded-2xl p-6 shadow-card',
        variantStyles[card.variant] ?? variantStyles.light,
        className,
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={cn('text-xs', isDark ? 'text-white/70' : 'text-ink-muted')}>
            Balance
          </p>
          <p className="text-xl font-semibold">{formatCurrency(card.balance)}</p>
        </div>
        <ChipIcon className={isDark ? 'text-white' : 'text-ink-soft'} />
      </div>

      <div className="mt-6 flex items-end justify-between text-xs">
        <div>
          <p className={cn(isDark ? 'text-white/60' : 'text-ink-muted')}>CARD HOLDER</p>
          <p className="mt-1 font-medium tracking-wide">{card.cardHolder}</p>
        </div>
        <div>
          <p className={cn(isDark ? 'text-white/60' : 'text-ink-muted')}>VALID THRU</p>
          <p className="mt-1 font-medium tracking-wide">{card.validThru}</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm font-medium tracking-[0.15em]">{card.number}</p>
        <NetworkMark className={isDark ? 'text-white' : 'text-ink-faint'} />
      </div>
    </motion.div>
  )
}
