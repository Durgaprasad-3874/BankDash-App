import { formatCurrency, formatDate } from './format'

export function downloadReceipt(transaction) {
  const lines = [
    'BankDash — Transaction Receipt',
    '--------------------------------',
    `Transaction ID: ${transaction.transactionId}`,
    `Description: ${transaction.description}`,
    `Category: ${transaction.category}`,
    `Card: ${transaction.card}`,
    `Date: ${formatDate(transaction.date)}`,
    `Amount: ${formatCurrency(transaction.amount, { signDisplay: true })}`,
  ]
  const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `receipt-${transaction.transactionId.replace('#', '')}.txt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
