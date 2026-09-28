import {
  Check,
  CircleDollarSign,
  Clock3,
  Gift,
  Globe2,
  Headphones,
  Plane,
  Shield,
  Star,
} from 'lucide-react'
import { useState } from 'react'

const rewards = [
  {
    id: 'lounge',
    title: 'Airport Lounge Access',
    description: '2 free visits per quarter at 1,200+ lounges.',
    points: 3000,
    icon: Plane,
    tone: 'bg-primary-50 text-primary-400',
  },
  {
    id: 'dining',
    title: '5% Cashback on Dining',
    description: 'Boost dining cashback for 30 days.',
    points: 1500,
    icon: Gift,
    tone: 'bg-amber-50 text-amber-500',
  },
  {
    id: 'forex',
    title: 'Zero Forex Markup',
    description: 'No foreign transaction fees for 60 days.',
    points: 2500,
    icon: Globe2,
    tone: 'bg-pink-50 text-pink-400',
  },
  {
    id: 'movies',
    title: 'Movie Tickets',
    description: 'Buy 1 get 1 free on weekend shows.',
    points: 800,
    icon: Star,
    tone: 'bg-teal-50 text-teal-500',
  },
  {
    id: 'support',
    title: 'Priority Support',
    description: 'Dedicated relationship manager for 90 days.',
    points: 4000,
    icon: Headphones,
    tone: 'bg-primary-50 text-primary-400',
  },
  {
    id: 'fee-waiver',
    title: 'Fee Waiver',
    description: 'Waive one annual card fee.',
    points: 5000,
    icon: Shield,
    tone: 'bg-amber-50 text-amber-500',
  },
]

const initialPoints = 12450

function formatPoints(points) {
  return new Intl.NumberFormat('en-US').format(points)
}

export function PrivilegesPage() {
  const [points, setPoints] = useState(initialPoints)
  const [redemptions, setRedemptions] = useState([])
  const [notice, setNotice] = useState('')

  function redeem(reward) {
    if (points < reward.points) {
      setNotice(`You need ${formatPoints(reward.points - points)} more points to redeem this reward.`)
      return
    }

    setPoints((current) => current - reward.points)
    setRedemptions((current) => [
      { id: `${reward.id}-${Date.now()}`, title: reward.title, points: reward.points },
      ...current,
    ])
    setNotice(`${reward.title} redeemed successfully.`)
  }

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-[2fr_1fr]">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#343c83] to-[#2116e8] p-6 text-white shadow-card sm:p-7">
          <div className="absolute -right-10 -top-20 h-56 w-56 rounded-full bg-white/5" />
          <div className="relative flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white/60">Membership</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">Gold Member</h2>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white/60">Available points</p>
              <p className="mt-0.5 text-3xl font-bold leading-none tracking-wide">{formatPoints(points)}</p>
            </div>
          </div>
          <div className="relative mt-7">
            <div
              className="h-2.5 overflow-hidden rounded-full bg-white/20"
              role="progressbar"
              aria-label="Progress to Platinum membership"
              aria-valuemin={0}
              aria-valuemax={25000}
              aria-valuenow={points}
            >
              <div className="h-full rounded-full bg-accent-teal transition-all" style={{ width: `${Math.min((points / 25000) * 100, 100)}%` }} />
            </div>
            <p className="mt-2 text-xs text-white/75">{formatPoints(25000 - points)} more points to Platinum</p>
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-semibold text-ink-soft">How to earn</h2>
          <div className="space-y-2 rounded-2xl bg-surface-card px-5 py-4 shadow-card">
            <p className="text-sm text-ink-muted"><span className="font-semibold text-ink">1 point</span> for every $1 spent on cards</p>
            <p className="text-sm text-ink-muted"><span className="font-semibold text-ink">500 points</span> for each new investment</p>
            <p className="text-sm text-ink-muted"><span className="font-semibold text-ink">2× points</span> on dining and travel</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="rewards-heading">
        <h2 id="rewards-heading" className="mb-3 text-lg font-semibold text-ink-soft">Rewards</h2>
        {notice && (
          <div role="status" className="mb-4 flex items-center gap-2 rounded-xl bg-primary-50 px-4 py-3 text-sm text-primary-700">
            <Check size={16} /> {notice}
          </div>
        )}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {rewards.map((reward) => {
            const Icon = reward.icon
            const canRedeem = points >= reward.points
            return (
              <article key={reward.id} className="flex min-h-[186px] flex-col rounded-2xl bg-surface-card p-5 shadow-card transition-shadow hover:shadow-cardHover">
                <div className={`mb-2 flex h-11 w-11 items-center justify-center rounded-full ${reward.tone}`}>
                  <Icon size={18} strokeWidth={1.8} />
                </div>
                <h3 className="text-sm font-medium text-ink">{reward.title}</h3>
                <p className="mt-1.5 text-xs leading-5 text-ink-muted">{reward.description}</p>
                <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-ink">
                    <CircleDollarSign size={15} className="text-primary" /> {formatPoints(reward.points)} pts
                  </span>
                  <button
                    type="button"
                    onClick={() => redeem(reward)}
                    disabled={!canRedeem}
                    className="inline-flex h-9 items-center justify-center rounded-xl bg-primary px-4 text-xs font-semibold text-white transition-colors hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:bg-surface-border disabled:text-ink-muted"
                  >
                    Redeem
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section aria-labelledby="history-heading" className="rounded-2xl bg-surface-card p-5 shadow-card sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 id="history-heading" className="text-lg font-semibold text-ink-soft">Redemption History</h2>
          <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted"><Clock3 size={14} /> Recent activity</span>
        </div>
        {redemptions.length === 0 ? (
          <p className="rounded-xl bg-surface-field px-4 py-5 text-sm text-ink-muted">Your redeemed rewards will appear here.</p>
        ) : (
          <ul className="divide-y divide-surface-border/70">
            {redemptions.map((redemption) => (
              <li key={redemption.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <span className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-teal/15 text-accent-teal"><Gift size={16} /></span>
                  <span>
                    <span className="block text-sm font-medium text-ink-soft">{redemption.title}</span>
                    <span className="mt-0.5 block text-xs text-ink-muted">Just now</span>
                  </span>
                </span>
                <span className="text-sm font-medium text-ink">−{formatPoints(redemption.points)} pts</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
