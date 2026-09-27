import { Briefcase, Building2, User, Wallet2 } from 'lucide-react'
import { getLoansOverview } from '../../api/endpoints/loans'
import { useFetch } from '../../hooks/useFetch'
import { Card, CardHeader } from '../../components/common/Card'
import { StatTile } from '../../components/common/StatTile'
import { DataTable } from '../../components/common/DataTable'
import { Button } from '../../components/common/Button'
import { Skeleton } from '../../components/common/Skeleton'
import { formatCurrency } from '../../utils/format'

const icons = {
  personal: User,
  corporate: Building2,
  business: Briefcase,
  custom: Wallet2,
}

export function LoansPage() {
  const { data, isLoading } = useFetch(getLoansOverview, [])

  if (isLoading || !data) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    )
  }

  const columns = [
    { key: 'slNo', label: 'Sl.No' },
    {
      key: 'loanAmount',
      label: 'Loan Amount',
      sortable: true,
      render: (row) => formatCurrency(row.loanAmount),
    },
    {
      key: 'leftToRepay',
      label: 'Left to Repay',
      sortable: true,
      render: (row) => formatCurrency(row.leftToRepay),
    },
    { key: 'duration', label: 'Duration' },
    {
      key: 'interestRate',
      label: 'Interest Rate',
      sortable: true,
      render: (row) => `${row.interestRate}%`,
    },
    {
      key: 'installment',
      label: 'Installment',
      render: (row) => `${formatCurrency(row.installment)}/month`,
    },
    {
      key: 'actions',
      label: 'Repay',
      render: () => (
        <Button size="sm" variant="outline" className="!h-8 !px-4 !text-xs">
          Repay
        </Button>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.summary.map((item) => {
          const Icon = icons[item.icon] ?? Wallet2
          return (
            <StatTile
              key={item.id}
              icon={<Icon size={20} />}
              label={item.label}
              value={item.value ? formatCurrency(item.value) : 'Choose Money'}
              tone={item.color}
            />
          )
        })}
      </div>

      <Card>
        <CardHeader title="Active Loans Overview" />
        <DataTable columns={columns} data={data.activeLoans} keyField="id" />
      </Card>
    </div>
  )
}
