import { getDashboardOverview } from '../../api/endpoints/dashboard'
import { useFetch } from '../../hooks/useFetch'
import { Skeleton } from '../../components/common/Skeleton'
import { BarChartCard } from '../../components/charts/BarChartCard'
import { DonutChartCard } from '../../components/charts/DonutChartCard'
import { AreaChartCard } from '../../components/charts/AreaChartCard'
import { chartColors } from '../../utils/chartTheme'
import { BalanceCards } from './components/BalanceCards'
import { RecentTransactions } from './components/RecentTransactions'
import { QuickTransfer } from './components/QuickTransfer'

export function DashboardPage() {
  const { data, isLoading } = useFetch(getDashboardOverview, [])

  if (isLoading || !data) {
    return <DashboardSkeleton />
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <section aria-labelledby="my-cards-heading" className="xl:col-span-2">
          <h2 id="my-cards-heading" className="sr-only">
            My Cards
          </h2>
          <BalanceCards cards={data.cards} />
        </section>
        <RecentTransactions transactions={data.recentTransactions} />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <BarChartCard
          title="Weekly Activity"
          data={data.weeklyActivity}
          xKey="day"
          bars={[
            { key: 'deposit', name: 'Deposit', color: chartColors.primary },
            { key: 'withdraw', name: 'Withdraw', color: chartColors.teal },
          ]}
          className="xl:col-span-2"
        />
        <DonutChartCard
          title="Expense Statistics"
          data={data.expenseStatistics}
          height={220}
          variant="labels"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <QuickTransfer contacts={data.quickTransferContacts} />
        <AreaChartCard
          title="Balance History"
          data={data.balanceHistory}
          xKey="month"
          yKey="value"
        />
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Skeleton className="h-72 xl:col-span-2" />
        <Skeleton className="h-72" />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    </div>
  )
}
