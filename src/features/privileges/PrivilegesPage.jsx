import { ShieldCheck } from 'lucide-react'
import { Card, CardHeader } from '../../components/common/Card'
import { Switch } from '../../components/common/Switch'
import { useState } from 'react'

const initialPrivileges = [
  {
    id: 'p-1',
    label: 'View Transactions',
    description: 'Allow viewing all transaction history',
    enabled: true,
  },
  {
    id: 'p-2',
    label: 'Manage Cards',
    description: 'Add, remove or freeze payment cards',
    enabled: true,
  },
  {
    id: 'p-3',
    label: 'Approve Loans',
    description: 'Approve or reject loan applications',
    enabled: false,
  },
  {
    id: 'p-4',
    label: 'Export Reports',
    description: 'Download account and transaction reports',
    enabled: true,
  },
]

export function PrivilegesPage() {
  const [privileges, setPrivileges] = useState(initialPrivileges)

  return (
    <Card>
      <CardHeader
        title="My Privileges"
        action={
          <span className="flex items-center gap-2 text-xs text-ink-muted">
            <ShieldCheck size={16} className="text-primary" />
            Role: Administrator
          </span>
        }
      />
      <ul className="divide-y divide-surface-border/60">
        {privileges.map((privilege) => (
          <li key={privilege.id} className="flex items-center justify-between gap-4 py-4">
            <span>
              <p className="text-sm font-medium text-ink-soft">{privilege.label}</p>
              <p className="text-xs text-ink-muted">{privilege.description}</p>
            </span>
            <Switch
              checked={privilege.enabled}
              label={privilege.label}
              onChange={(next) =>
                setPrivileges((prev) =>
                  prev.map((p) => (p.id === privilege.id ? { ...p, enabled: next } : p)),
                )
              }
            />
          </li>
        ))}
      </ul>
    </Card>
  )
}
