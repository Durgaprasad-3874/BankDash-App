import { CreditCard, FileText, PiggyBank, Wallet } from 'lucide-react'
import { getAccountsOverview } from '../../api/endpoints/accounts'
import { useFetch } from '../../hooks/useFetch'
import { StatTile } from '../../components/common/StatTile'
import { Card, CardHeader } from '../../components/common/Card'
import { CreditCardVisual } from '../../components/common/CreditCardVisual'
import { BarChartCard } from '../../components/charts/BarChartCard'
import { Skeleton } from '../../components/common/Skeleton'
import { formatCurrency, formatDate } from '../../utils/format'
import { chartColors } from '../../utils/chartTheme'
import { cn } from '../../utils/cn'

const icons = {
  wallet: Wallet,
  invoice: FileText,
  expense: CreditCard,
  saving: PiggyBank,
}

export function AccountsPage() {
  const { data, isLoading } = useFetch(getAccountsOverview, [])

  if (isLoading || !data) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-80" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.summary.map((item) => {
          const Icon = icons[item.icon] ?? Wallet
          return (
            <StatTile
              key={item.id}
              icon={<Icon size={20} />}
              label={item.label}
              value={formatCurrency(item.value)}
              tone={item.color}
            />
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Latest Transactions" />
          <ul className="divide-y divide-surface-border/60">
            {data.latestTransactions.map((tx) => (
              <li
                key={tx.id}
                className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm"
              >
                <span className="font-medium text-ink-soft">{tx.name}</span>
                <span className="text-ink-muted">{formatDate(tx.date)}</span>
                <span className="text-ink-muted">{tx.type}</span>
                <span className="text-ink-muted">{tx.card}</span>
                <span
                  className={cn(
                    'font-semibold',
                    tx.amount < 0 ? 'text-danger' : 'text-success',
                  )}
                >
                  {formatCurrency(tx.amount, { signDisplay: true })}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardHeader title="My Card" />
          <CreditCardVisual card={data.card} />
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <BarChartCard
          title="Debit & Credit Overview"
          data={data.debitCreditOverview}
          xKey="month"
          bars={[
            { key: 'debit', name: 'Debit', color: chartColors.orange },
            { key: 'credit', name: 'Credit', color: chartColors.primary },
          ]}
          className="lg:col-span-2"
        />
        <Card>
          <CardHeader title="Invoices Sent" />
          <ul className="space-y-3">
            {data.invoicesSent.map((invoice) => (
              <li
                key={invoice.id}
                className="flex items-center justify-between rounded-xl bg-surface-field px-4 py-3 text-sm"
              >
                <span className="text-ink-soft">{invoice.label}</span>
                <span className="font-semibold text-ink">
                  {formatCurrency(invoice.amount)}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
