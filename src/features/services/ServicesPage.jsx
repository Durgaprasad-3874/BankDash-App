import { motion } from 'framer-motion'
import {
  BriefcaseBusiness,
  CreditCard,
  HeartPulse,
  PiggyBank,
  ShieldCheck,
  ShoppingBag,
  WalletCards,
} from 'lucide-react'
import { getServicesOverview } from '../../api/endpoints/services'
import { useFetch } from '../../hooks/useFetch'
import { Card } from '../../components/common/Card'
import { Button } from '../../components/common/Button'
import { Skeleton } from '../../components/common/Skeleton'
import { cn } from '../../utils/cn'

const promoIcons = { shield: ShieldCheck, bag: ShoppingBag, safety: ShieldCheck }
const serviceIcons = {
  business: BriefcaseBusiness,
  checking: WalletCards,
  savings: PiggyBank,
  cards: CreditCard,
  insurance: HeartPulse,
  'personal-loan': BriefcaseBusiness,
}
const promoTones = {
  primary: 'bg-primary text-white',
  orange: 'bg-accent-orange text-white',
  teal: 'bg-accent-teal text-white',
}

export function ServicesPage() {
  const { data, isLoading } = useFetch(getServicesOverview, [])

  if (isLoading || !data) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {data.promoServices.map((promo, index) => {
          const Icon = promoIcons[promo.icon] ?? ShieldCheck
          return (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="flex items-center gap-4 rounded-2xl bg-surface-card p-5 shadow-card"
            >
              <span
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-full',
                  promoTones[promo.color],
                )}
              >
                <Icon size={22} />
              </span>
              <span>
                <p className="text-sm font-semibold text-ink-soft">{promo.title}</p>
                <p className="text-xs text-ink-muted">{promo.tagline}</p>
              </span>
            </motion.div>
          )
        })}
      </div>

      <Card>
        <h3 className="mb-5 text-lg font-semibold text-ink-soft">Bank Services List</h3>
        <ul className="divide-y divide-surface-border/60">
          {data.bankServicesList.map((service) => (
            <li
              key={service.id}
              className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-[minmax(190px,1.2fr)_repeat(3,minmax(120px,1fr))_auto] sm:items-center sm:gap-5"
            >
              <div className="flex items-center gap-3">
                <span className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
                  service.color === 'pink' ? 'bg-accent-magenta/15 text-accent-magenta' :
                    service.color === 'orange' ? 'bg-accent-orange/15 text-accent-orange' :
                      service.color === 'teal' ? 'bg-accent-teal/15 text-accent-teal' :
                        service.color === 'mint' ? 'bg-accent-mint/15 text-accent-mint' :
                          'bg-primary-50 text-primary',
                )}>
                  {(() => {
                    const Icon = serviceIcons[service.icon] ?? ShieldCheck
                    return <Icon size={18} />
                  })()}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink-soft">{service.name}</span>
                  <span className="mt-0.5 block text-xs leading-5 text-ink-muted">{service.description}</span>
                </span>
              </div>
              {service.details?.map((detail) => (
                <div key={detail.title} className="pl-[52px] sm:pl-0">
                  <p className="text-xs font-medium text-ink-soft">{detail.title}</p>
                  <p className="mt-0.5 text-xs leading-5 text-ink-muted">{detail.description}</p>
                </div>
              ))}
              <Button
                size="sm"
                variant={service.highlighted ? 'primary' : 'outline'}
                className="w-fit"
              >
                {service.cta}
              </Button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
