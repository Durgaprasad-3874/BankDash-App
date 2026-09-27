import { CreditCard, Plus } from 'lucide-react'
import { useState } from 'react'
import { getCreditCardsOverview } from '../../api/endpoints/creditCards'
import { useFetch } from '../../hooks/useFetch'
import { Card, CardHeader } from '../../components/common/Card'
import { CreditCardVisual } from '../../components/common/CreditCardVisual'
import { Button } from '../../components/common/Button'
import { Switch } from '../../components/common/Switch'
import { DataTable } from '../../components/common/DataTable'
import { DonutChartCard } from '../../components/charts/DonutChartCard'
import { Skeleton } from '../../components/common/Skeleton'
import { AddCardModal } from './components/AddCardModal'

export function CreditCardsPage() {
  const { data, isLoading } = useFetch(getCreditCardsOverview, [])
  const [modalOpen, setModalOpen] = useState(false)
  const [cards, setCards] = useState(null)
  const [settings, setSettings] = useState(null)

  if (isLoading || !data) {
    return (
      <div className="space-y-6">
        <div className="flex gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-64" />
          ))}
        </div>
        <Skeleton className="h-80" />
      </div>
    )
  }

  const displayCards = cards ?? data.cards
  const displaySettings = settings ?? data.cardSettings

  const bankTones = {
    'DBL Bank': 'bg-primary-100 text-primary',
    'BRC Bank': 'bg-accent-pink/15 text-accent-pink',
    'ABM Bank': 'bg-accent-teal/15 text-accent-teal',
    'MCP Bank': 'bg-accent-orange/15 text-accent-orange',
  }

  const cardListColumns = [
    {
      key: 'type',
      label: 'Card Type',
      sortable: true,
      render: (row) => (
        <span className="flex items-center gap-3">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${bankTones[row.bank] ?? 'bg-surface-field text-ink-muted'}`}
          >
            <CreditCard size={16} />
          </span>
          {row.type}
        </span>
      ),
    },
    { key: 'bank', label: 'Bank' },
    { key: 'number', label: 'Card Number' },
    { key: 'holder', label: 'Card Holder' },
    {
      key: 'actions',
      label: 'Action',
      render: () => (
        <button
          type="button"
          className="text-xs font-medium text-primary hover:underline"
        >
          View Details
        </button>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="My Cards"
          action={
            <Button
              size="sm"
              icon={<Plus size={14} />}
              onClick={() => setModalOpen(true)}
            >
              Add New Card
            </Button>
          }
        />
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
          {displayCards.map((card) => (
            <CreditCardVisual key={card.id} card={card} className="min-w-[280px]" />
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <DonutChartCard
          title="Card Expense Statistics"
          data={data.expenseStatistics}
          height={200}
        />

        <Card className="lg:col-span-2">
          <CardHeader title="Card List" />
          <DataTable columns={cardListColumns} data={data.cardList} />
        </Card>
      </div>

      <Card>
        <CardHeader title="Card Setting" />
        <ul className="divide-y divide-surface-border/60">
          {displaySettings.map((setting) => (
            <li key={setting.id} className="flex items-center justify-between gap-4 py-4">
              <span>
                <p className="text-sm font-medium text-ink-soft">{setting.label}</p>
                <p className="text-xs text-ink-muted">{setting.description}</p>
              </span>
              <Switch
                checked={setting.enabled}
                label={setting.label}
                onChange={(next) =>
                  setSettings(
                    displaySettings.map((s) =>
                      s.id === setting.id ? { ...s, enabled: next } : s,
                    ),
                  )
                }
              />
            </li>
          ))}
        </ul>
      </Card>

      <AddCardModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={(form) =>
          setCards([
            ...displayCards,
            {
              id: `cc-${Date.now()}`,
              balance: 0,
              cardHolder: form.cardName,
              validThru: form.expirationDate,
              number: form.cardNumber,
              variant: 'outline',
            },
          ])
        }
      />
    </div>
  )
}
