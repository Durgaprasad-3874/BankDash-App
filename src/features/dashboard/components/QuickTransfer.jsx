import { Send } from 'lucide-react'
import { useState } from 'react'
import { Card, CardHeader } from '../../../components/common/Card'
import { Avatar } from '../../../components/common/Avatar'
import { Button } from '../../../components/common/Button'

export function QuickTransfer({ contacts }) {
  const [amount, setAmount] = useState('525.50')

  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <Card>
      <CardHeader title="Quick Transfer" />
      <div className="mb-6 flex gap-5 overflow-x-auto pb-2 scrollbar-thin">
        {contacts.map((contact) => (
          <div key={contact.id} className="flex shrink-0 flex-col items-center gap-2">
            <Avatar name={contact.name} size="lg" />
            <span className="text-xs font-medium text-ink-soft">
              {contact.name.split(' ')[0]}
            </span>
            <span className="text-[11px] text-ink-muted">{contact.role}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-3">
        <label className="flex flex-wrap items-center gap-3">
          <span className="shrink-0 text-sm text-ink-muted">Write Amount</span>
          <input
            type="text"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="h-11 w-28 rounded-full bg-surface-field px-5 text-sm text-ink outline-none placeholder:text-ink-faint"
          />
        </label>
        <Button type="submit" size="md" icon={<Send size={16} />} className="shrink-0">
          Send
        </Button>
      </form>
    </Card>
  )
}
