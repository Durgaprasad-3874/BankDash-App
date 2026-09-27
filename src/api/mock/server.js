import MockAdapter from 'axios-mock-adapter'
import { apiClient } from '../client'
import * as dashboard from './data/dashboard'
import { transactions, transactionCategories, myExpense } from './data/transactions'
import * as accounts from './data/accounts'
import * as investments from './data/investments'
import * as creditCards from './data/creditCards'
import { loanSummary, activeLoans } from './data/loans'
import { promoServices, bankServicesList } from './data/services'
import { userProfile, preferences } from './data/settings'

let profileState = { ...userProfile }
let preferencesState = { ...preferences }

export function startMockServer() {
  const mock = new MockAdapter(apiClient, { delayResponse: 350 })

  mock.onGet('/dashboard/overview').reply(200, {
    cards: dashboard.dashboardCards,
    recentTransactions: dashboard.recentTransactions,
    weeklyActivity: dashboard.weeklyActivity,
    expenseStatistics: dashboard.expenseStatistics,
    quickTransferContacts: dashboard.quickTransferContacts,
    balanceHistory: dashboard.balanceHistory,
  })

  mock.onGet('/transactions/overview').reply(200, {
    cards: dashboard.dashboardCards,
    myExpense,
  })

  mock.onGet('/transactions').reply((config) => {
    const params = new URLSearchParams(config.params)
    const search = (params.get('search') || '').toLowerCase()
    const category = params.get('category') || 'All'
    let result = transactions
    if (search) {
      result = result.filter((t) => t.description.toLowerCase().includes(search))
    }
    if (category !== 'All') {
      result = result.filter((t) => t.category === category)
    }
    return [200, { transactions: result, categories: transactionCategories }]
  })

  mock.onGet('/accounts/overview').reply(200, {
    summary: accounts.accountSummary,
    latestTransactions: accounts.latestTransactions,
    debitCreditOverview: accounts.debitCreditOverview,
    invoicesSent: accounts.invoicesSent,
    card: dashboard.dashboardCards[0],
  })

  mock.onGet('/investments/overview').reply(200, {
    summary: investments.investmentSummary,
    yearlyInvestment: investments.yearlyInvestment,
    monthlyRevenue: investments.monthlyRevenue,
    myInvestments: investments.myInvestments,
    trendingStocks: investments.trendingStocks,
  })

  mock.onGet('/credit-cards/overview').reply(200, {
    cards: creditCards.myCreditCards,
    expenseStatistics: creditCards.cardExpenseStatistics,
    cardList: creditCards.cardList,
    cardSettings: creditCards.cardSettings,
  })

  mock.onGet('/loans/overview').reply(200, {
    summary: loanSummary,
    activeLoans,
  })

  mock.onGet('/services/overview').reply(200, {
    promoServices,
    bankServicesList,
  })

  mock.onGet('/settings/profile').reply(() => [200, { ...profileState }])
  mock.onPut('/settings/profile').reply((config) => {
    profileState = { ...profileState, ...JSON.parse(config.data) }
    return [200, { ...profileState }]
  })

  mock.onGet('/settings/preferences').reply(() => [200, { ...preferencesState }])
  mock.onPut('/settings/preferences').reply((config) => {
    preferencesState = { ...preferencesState, ...JSON.parse(config.data) }
    return [200, { ...preferencesState }]
  })

  return mock
}
