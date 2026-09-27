import {
  CreditCard,
  HandCoins,
  LayoutDashboard,
  Landmark,
  Settings,
  ShieldCheck,
  User,
  Wallet2,
  Wrench,
} from 'lucide-react'

export const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { path: '/transactions', label: 'Transactions', icon: Wallet2 },
  { path: '/accounts', label: 'Accounts', icon: User },
  { path: '/investments', label: 'Investments', icon: Landmark },
  { path: '/credit-cards', label: 'Credit Cards', icon: CreditCard },
  { path: '/loans', label: 'Loans', icon: HandCoins },
  { path: '/services', label: 'Services', icon: Wrench },
  { path: '/privileges', label: 'My Privileges', icon: ShieldCheck },
  { path: '/settings', label: 'Setting', icon: Settings },
]
