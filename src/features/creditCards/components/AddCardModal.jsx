import { useState } from 'react'
import { Modal } from '../../../components/common/Modal'
import { Input } from '../../../components/common/Input'
import { Button } from '../../../components/common/Button'

const initialForm = { cardName: '', cardNumber: '', expirationDate: '', cvv: '' }

export function AddCardModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function validate() {
    const nextErrors = {}
    if (!form.cardName.trim()) nextErrors.cardName = 'Card holder name is required'
    if (!/^\d{4}(\s?\d{4}){2,3}$/.test(form.cardNumber.trim()))
      nextErrors.cardNumber = 'Enter a valid card number'
    if (!/^\d{2}\/\d{2}$/.test(form.expirationDate.trim()))
      nextErrors.expirationDate = 'Use MM/YY format'
    if (!/^\d{3,4}$/.test(form.cvv.trim())) nextErrors.cvv = 'Enter a valid CVV'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!validate()) return
    onAdd?.(form)
    setForm(initialForm)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Add New Card">
      <p className="mb-4 text-xs leading-relaxed text-ink-muted">
        A credit card is a plastic card issued by a bank or financial institution, giving
        the cardholder a credit limit that can be used to purchase goods and services on
        credit or obtain cash advances.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          label="Name On Card"
          name="cardName"
          value={form.cardName}
          onChange={(e) => update('cardName', e.target.value)}
          error={errors.cardName}
          placeholder="Eddy Cusuma"
        />
        <Input
          label="Card Number"
          name="cardNumber"
          value={form.cardNumber}
          onChange={(e) => update('cardNumber', e.target.value)}
          error={errors.cardNumber}
          placeholder="3778 1234 5678 9012"
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Expiration Date"
            name="expirationDate"
            value={form.expirationDate}
            onChange={(e) => update('expirationDate', e.target.value)}
            error={errors.expirationDate}
            placeholder="MM/YY"
          />
          <Input
            label="CVV"
            name="cvv"
            value={form.cvv}
            onChange={(e) => update('cvv', e.target.value)}
            error={errors.cvv}
            placeholder="123"
          />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Add Card</Button>
        </div>
      </form>
    </Modal>
  )
}
