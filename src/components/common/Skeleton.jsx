import { cn } from '../../utils/cn'

export function Skeleton({ className }) {
  return (
    <div className={cn('animate-pulse rounded-xl bg-surface-border/70', className)} />
  )
}
