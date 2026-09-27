import { BarChart3, Percent, TrendingUp } from 'lucide-react'
import { getInvestmentsOverview } from '../../api/endpoints/investments'
import { useFetch } from '../../hooks/useFetch'
import { StatTile } from '../../components/common/StatTile'
import { Card, CardHeader } from '../../components/common/Card'
import { DataTable } from '../../components/common/DataTable'
import { LineChartCard } from '../../components/charts/LineChartCard'
import { Skeleton } from '../../components/common/Skeleton'
import { formatCurrency, formatNumber, formatPercent } from '../../utils/format'
import { chartColors } from '../../utils/chartTheme'
import { cn } from '../../utils/cn'

const icons = { invest: TrendingUp, chart: BarChart3, return: Percent }

export function InvestmentsPage() {
  const { data, isLoading } = useFetch(getInvestmentsOverview, [])

  if (isLoading || !data) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-80" />
      </div>
    )
  }

  const investmentColumns = [
    { key: 'name', label: 'Company', sortable: true },
    { key: 'category', label: 'Category' },
    {
      key: 'invested',
      label: 'Invested Value',
      sortable: true,
      render: (row) => formatCurrency(row.invested),
    },
    {
      key: 'returnPct',
      label: 'Return',
      sortable: true,
      render: (row) => (
        <span
          className={cn(
            'font-semibold',
            row.returnPct >= 0 ? 'text-success' : 'text-danger',
          )}
        >
          {formatPercent(row.returnPct)}
        </span>
      ),
    },
  ]

  const trendingColumns = [
    { key: 'slNo', label: 'Sl.No' },
    { key: 'name', label: 'Name', sortable: true },
    {
      key: 'price',
      label: 'Price',
      sortable: true,
      render: (row) => formatCurrency(row.price),
    },
    {
      key: 'returnPct',
      label: 'Return',
      sortable: true,
      render: (row) => (
        <span
          className={cn(
            'font-semibold',
            row.returnPct >= 0 ? 'text-success' : 'text-danger',
          )}
        >
          {formatPercent(row.returnPct)}
        </span>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {data.summary.map((item) => {
          const Icon = icons[item.icon] ?? TrendingUp
          const value = item.isPercent
            ? formatPercent(item.value)
            : item.isCount
              ? formatNumber(item.value)
              : formatCurrency(item.value)
          return (
            <StatTile
              key={item.id}
              icon={<Icon size={20} />}
              label={item.label}
              value={value}
              tone={item.color}
            />
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <LineChartCard
          title="Yearly Total Investment"
          data={data.yearlyInvestment}
          xKey="period"
          yKey="value"
          color={chartColors.orange}
        />
        <LineChartCard
          title="Monthly Revenue"
          data={data.monthlyRevenue}
          xKey="period"
          yKey="value"
          color={chartColors.teal}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="My Investments" />
          <DataTable columns={investmentColumns} data={data.myInvestments} />
        </Card>
        <Card>
          <CardHeader title="Trending Stock" />
          <DataTable columns={trendingColumns} data={data.trendingStocks} keyField="id" />
        </Card>
      </div>
    </div>
  )
}
