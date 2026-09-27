import { useState } from 'react'
import { Input } from '../../../components/common/Input'
import { Button } from '../../../components/common/Button'
import { Switch } from '../../../components/common/Switch'

export function SecurityForm() {
  const [form, setForm] = useState({ current: '', next: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [twoFactor, setTwoFactor] = useState(true)
  const [status, setStatus] = useState('idle')

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function validate() {
    const nextErrors = {}
    if (!form.current) nextErrors.current = 'Current password is required'
    if (form.next.length < 8) nextErrors.next = 'Use at least 8 characters'
    if (form.confirm !== form.next) nextErrors.confirm = 'Passwords do not match'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!validate()) return
    setStatus('saved')
    setForm({ current: '', next: '', confirm: '' })
    setTimeout(() => setStatus('idle'), 2000)
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          label="Current Password"
          type="password"
          value={form.current}
          onChange={(e) => update('current', e.target.value)}
          error={errors.current}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="New Password"
            type="password"
            value={form.next}
            onChange={(e) => update('next', e.target.value)}
            error={errors.next}
          />
          <Input
            label="Confirm Password"
            type="password"
            value={form.confirm}
            onChange={(e) => update('confirm', e.target.value)}
            error={errors.confirm}
          />
        </div>
        <div className="flex items-center gap-3">
          <Button type="submit">Update Password</Button>
          {status === 'saved' && (
            <span className="text-xs text-success">Password updated</span>
          )}
        </div>
      </form>

      <div className="flex items-center justify-between gap-4 rounded-xl bg-surface-field px-4 py-3">
        <span>
          <p className="text-sm font-medium text-ink-soft">Two-Factor Authentication</p>
          <p className="text-xs text-ink-muted">
            Add an extra layer of security to your account
          </p>
        </span>
        <Switch
          checked={twoFactor}
          onChange={setTwoFactor}
          label="Two-factor authentication"
        />
      </div>
    </div>
  )
}
