import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { Skeleton } from '../components/common/Skeleton'
import { NotFoundPage } from './NotFoundPage'

const DashboardPage = lazy(() =>
  import('../features/dashboard/DashboardPage').then((m) => ({
    default: m.DashboardPage,
  })),
)
const TransactionsPage = lazy(() =>
  import('../features/transactions/TransactionsPage').then((m) => ({
    default: m.TransactionsPage,
  })),
)
const AccountsPage = lazy(() =>
  import('../features/accounts/AccountsPage').then((m) => ({ default: m.AccountsPage })),
)
const InvestmentsPage = lazy(() =>
  import('../features/investments/InvestmentsPage').then((m) => ({
    default: m.InvestmentsPage,
  })),
)
const CreditCardsPage = lazy(() =>
  import('../features/creditCards/CreditCardsPage').then((m) => ({
    default: m.CreditCardsPage,
  })),
)
const LoansPage = lazy(() =>
  import('../features/loans/LoansPage').then((m) => ({ default: m.LoansPage })),
)
const ServicesPage = lazy(() =>
  import('../features/services/ServicesPage').then((m) => ({ default: m.ServicesPage })),
)
const PrivilegesPage = lazy(() =>
  import('../features/privileges/PrivilegesPage').then((m) => ({
    default: m.PrivilegesPage,
  })),
)
const SettingsPage = lazy(() =>
  import('../features/settings/SettingsPage').then((m) => ({ default: m.SettingsPage })),
)

function withSuspense(Element) {
  return (
    <Suspense fallback={<Skeleton className="h-96" />}>
      <Element />
    </Suspense>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: withSuspense(DashboardPage) },
      { path: 'transactions', element: withSuspense(TransactionsPage) },
      { path: 'accounts', element: withSuspense(AccountsPage) },
      { path: 'investments', element: withSuspense(InvestmentsPage) },
      { path: 'credit-cards', element: withSuspense(CreditCardsPage) },
      { path: 'loans', element: withSuspense(LoansPage) },
      { path: 'services', element: withSuspense(ServicesPage) },
      { path: 'privileges', element: withSuspense(PrivilegesPage) },
      { path: 'settings', element: withSuspense(SettingsPage) },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
