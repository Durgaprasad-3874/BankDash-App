import { useState } from 'react'
import { updatePreferences } from '../../../api/endpoints/settings'
import { Switch } from '../../../components/common/Switch'
import { Button } from '../../../components/common/Button'

const selectClass =
  'h-11 w-full rounded-xl bg-surface-field px-4 text-sm text-ink outline-none focus:ring-2 focus:ring-primary-100'

export function PreferencesForm({ preferences }) {
  const [form, setForm] = useState(preferences)
  const [status, setStatus] = useState('idle')

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('saving')
    await updatePreferences(form)
    setStatus('saved')
    setTimeout(() => setStatus('idle'), 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-2 block text-xs font-medium text-ink-muted">Currency</span>
          <select
            className={selectClass}
            value={form.currency}
            onChange={(e) => update('currency', e.target.value)}
          >
            {['USD', 'EUR', 'GBP', 'INR'].map((currency) => (
              <option key={currency}>{currency}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-2 block text-xs font-medium text-ink-muted">Time Zone</span>
          <select
            className={selectClass}
            value={form.timezone}
            onChange={(e) => update('timezone', e.target.value)}
          >
            {['GMT-08:00', 'GMT-05:00', 'GMT+00:00', 'GMT+05:30'].map((tz) => (
              <option key={tz}>{tz}</option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold text-ink-soft">Notification</p>
        <div className="space-y-4">
          <ToggleRow
            label="I send or receive digital currency"
            checked={form.digitalCurrencyNotifications}
            onChange={(v) => update('digitalCurrencyNotifications', v)}
          />
          <ToggleRow
            label="I receive merchant order"
            checked={form.merchantOrderNotifications}
            onChange={(v) => update('merchantOrderNotifications', v)}
          />
          <ToggleRow
            label="There are recommendation for my account"
            checked={form.recommendationNotifications}
            onChange={(v) => update('recommendationNotifications', v)}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={status === 'saving'}>
          {status === 'saving' ? 'Saving...' : 'Save'}
        </Button>
        {status === 'saved' && (
          <span className="text-xs text-success">Preferences updated</span>
        )}
      </div>
    </form>
  )
}

function ToggleRow({ label, checked, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <Switch checked={checked} onChange={onChange} label={label} />
      <span className="text-sm text-ink-soft">{label}</span>
    </div>
  )
}
