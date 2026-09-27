import { motion } from 'framer-motion'
import { CreditCardVisual } from '../../../components/common/CreditCardVisual'

export function BalanceCards({ cards }) {
  return (
    <div className="flex h-full gap-4 overflow-x-auto pb-2 scrollbar-thin sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08, duration: 0.3 }}
          className="flex h-full"
        >
          <CreditCardVisual card={card} className="h-full w-full" />
        </motion.div>
      ))}
    </div>
  )
}
