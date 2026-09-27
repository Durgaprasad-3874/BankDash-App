import { ArrowDownLeft, ArrowUpRight, Download, Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  getTransactions,
  getTransactionsOverview,
} from '../../api/endpoints/transactions'
import { useFetch } from '../../hooks/useFetch'
import { Card, CardHeader } from '../../components/common/Card'
import { CreditCardVisual } from '../../components/common/CreditCardVisual'
import { DataTable } from '../../components/common/DataTable'
import { Pagination } from '../../components/common/Pagination'
import { Tabs } from '../../components/common/Tabs'
import { Skeleton } from '../../components/common/Skeleton'
import { formatCurrency, formatDate } from '../../utils/format'
import { downloadReceipt } from '../../utils/downloadReceipt'
import { cn } from '../../utils/cn'
import { MyExpenseCard } from './components/MyExpenseCard'

const tabs = [
  { id: 'all', label: 'All Transactions' },
  { id: 'income', label: 'Income' },
  { id: 'expense', label: 'Expense' },
]

const PAGE_SIZE = 5

export function TransactionsPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [page, setPage] = useState(1)

  const { data: overview, isLoading: loadingOverview } = useFetch(
    getTransactionsOverview,
    [],
  )
  const { data, isLoading } = useFetch(() => getTransactions(), [])

  const filtered = useMemo(() => {
    const rows = data?.transactions ?? []
    if (activeTab === 'income') return rows.filter((row) => row.amount > 0)
    if (activeTab === 'expense') return rows.filter((row) => row.amount < 0)
    return rows
  }, [data, activeTab])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleTabChange(tabId) {
    setActiveTab(tabId)
    setPage(1)
  }

  const columns = useMemo(
    () => [
      {
        key: 'description',
        label: 'Description',
        render: (row) => (
          <span className="flex items-center gap-3">
            <span
              className={cn(
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
                row.amount < 0
                  ? 'bg-primary-100 text-primary'
                  : 'bg-accent-teal/15 text-accent-teal',
              )}
            >
              {row.amount < 0 ? <ArrowUpRight size={16} /> : <ArrowDownLeft size={16} />}
            </span>
            {row.description}
          </span>
        ),
      },
      { key: 'transactionId', label: 'Transaction ID' },
      { key: 'category', label: 'Type', sortable: true },
      { key: 'card', label: 'Card' },
      {
        key: 'date',
        label: 'Date',
        sortable: true,
        render: (row) => formatDate(row.date),
      },
      {
        key: 'amount',
        label: 'Amount',
        sortable: true,
        render: (row) => (
          <span
            className={cn(
              'font-semibold',
              row.amount < 0 ? 'text-danger' : 'text-success',
            )}
          >
            {formatCurrency(row.amount, { signDisplay: true })}
          </span>
        ),
      },
      {
        key: 'receipt',
        label: 'Receipt',
        render: (row) => (
          <button
            type="button"
            onClick={() => downloadReceipt(row)}
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary-50"
          >
            <Download size={12} /> Download
          </button>
        ),
      },
    ],
    [],
  )

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader
            title="My Cards"
            action={
              <span className="flex items-center gap-1 text-xs font-medium text-primary">
                <Plus size={14} /> Add Card
              </span>
            }
          />
          {loadingOverview || !overview ? (
            <div className="flex gap-4">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="hidden h-40 w-full sm:block" />
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin sm:grid sm:grid-cols-2 sm:overflow-visible">
              {overview.cards.map((card) => (
                <CreditCardVisual key={card.id} card={card} />
              ))}
            </div>
          )}
        </Card>

        {loadingOverview || !overview ? (
          <Skeleton className="h-56" />
        ) : (
          <MyExpenseCard data={overview.myExpense} />
        )}
      </div>

      <Card>
        <div className="mb-5 flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-ink-soft">Recent Transactions</h3>
          <Tabs tabs={tabs} activeTab={activeTab} onChange={handleTabChange} />
        </div>

        {isLoading || !data ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12" />
            ))}
          </div>
        ) : (
          <>
            <DataTable columns={columns} data={pageRows} />
            <Pagination page={page} pageCount={pageCount} onChange={setPage} />
          </>
        )}
      </Card>
    </div>
  )
}
