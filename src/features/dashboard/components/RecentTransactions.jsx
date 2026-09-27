import { Coins, Mail, Wallet } from 'lucide-react'
import { Card, CardHeader } from '../../../components/common/Card'
import { formatCurrency, formatShortDate } from '../../../utils/format'
import { cn } from '../../../utils/cn'

const icons = { card: Mail, paypal: Wallet, transfer: Coins }
const tones = {
  card: 'bg-accent-yellow/30 text-accent-orange',
  paypal: 'bg-primary-100 text-primary',
  transfer: 'bg-accent-teal/20 text-accent-teal',
}

export function RecentTransactions({ transactions }) {
  return (
    <Card>
      <CardHeader title="Recent Transaction" />
      <ul className="space-y-4">
        {transactions.map((tx) => {
          const Icon = icons[tx.type] ?? Wallet
          return (
            <li key={tx.id} className="flex items-start gap-3">
              <span
                className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                  tones[tx.type],
                )}
              >
                <Icon size={18} />
              </span>
              <span className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink-soft">{tx.title}</p>
                <p className="whitespace-nowrap text-xs text-ink-muted">
                  {formatShortDate(tx.date)}
                </p>
              </span>
              <span
                className={cn(
                  'shrink-0 whitespace-nowrap text-sm font-semibold',
                  tx.amount < 0 ? 'text-danger' : 'text-success',
                )}
              >
                {formatCurrency(tx.amount, { signDisplay: true })}
              </span>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
