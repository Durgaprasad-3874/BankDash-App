import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { updateProfile } from '../../../api/endpoints/settings'
import { Avatar } from '../../../components/common/Avatar'
import { Input } from '../../../components/common/Input'
import { Button } from '../../../components/common/Button'
import { currentUser } from '../../../utils/currentUser'

export function EditProfileForm({ profile }) {
  const [form, setForm] = useState(profile)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function validate() {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Name is required'
    if (!form.username.trim()) nextErrors.username = 'User name is required'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = 'Enter a valid email'
    if (!form.postalCode.trim()) nextErrors.postalCode = 'Postal code is required'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (!validate()) return
    setStatus('saving')
    await updateProfile(form)
    setStatus('saved')
    setTimeout(() => setStatus('idle'), 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="relative inline-block">
        <Avatar name={form.name} src={currentUser.avatar} size="lg" />
        <label className="absolute -bottom-1 -right-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-card">
          <Pencil size={12} />
          <span className="sr-only">Change photo</span>
          <input type="file" accept="image/*" className="sr-only" />
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Your Name"
          name="name"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          error={errors.name}
        />
        <Input
          label="User Name"
          name="username"
          value={form.username}
          onChange={(e) => update('username', e.target.value)}
          error={errors.username}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          error={errors.email}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={(e) => update('password', e.target.value)}
        />
        <Input
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          value={form.dateOfBirth}
          onChange={(e) => update('dateOfBirth', e.target.value)}
        />
        <Input
          label="Present Address"
          name="presentAddress"
          value={form.presentAddress}
          onChange={(e) => update('presentAddress', e.target.value)}
        />
        <Input
          label="Permanent Address"
          name="permanentAddress"
          value={form.permanentAddress}
          onChange={(e) => update('permanentAddress', e.target.value)}
        />
        <Input
          label="City"
          name="city"
          value={form.city}
          onChange={(e) => update('city', e.target.value)}
        />
        <Input
          label="Postal Code"
          name="postalCode"
          value={form.postalCode}
          onChange={(e) => update('postalCode', e.target.value)}
          error={errors.postalCode}
        />
        <Input
          label="Country"
          name="country"
          value={form.country}
          onChange={(e) => update('country', e.target.value)}
        />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={status === 'saving'}>
          {status === 'saving' ? 'Saving...' : 'Save'}
        </Button>
        {status === 'saved' && (
          <span className="text-xs text-success">Profile updated</span>
        )}
      </div>
    </form>
  )
}
