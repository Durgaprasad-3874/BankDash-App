export function formatCurrency(value, { signDisplay = false } = {}) {
  if (value === null || value === undefined) return '--'
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Math.abs(value))
  if (!signDisplay) return formatted
  return value < 0 ? `-${formatted}` : `+${formatted}`
}

export function formatNumber(value) {
  return new Intl.NumberFormat('en-US').format(value)
}

export function formatShortDate(value) {
  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}

export function formatDate(value) {
  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))
}

export function formatPercent(value) {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value}%`
}
