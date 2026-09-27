import { cn } from '../../utils/cn'

const tones = {
  success: 'bg-success/10 text-success',
  danger: 'bg-danger/10 text-danger',
  warning: 'bg-accent-orange/10 text-accent-orange',
  neutral: 'bg-surface-field text-ink-muted',
  primary: 'bg-primary-50 text-primary',
}

export function Badge({ tone = 'neutral', className, children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
