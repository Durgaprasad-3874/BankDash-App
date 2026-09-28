from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, ListFlowable, ListItem

OUTPUT = "BankDash_Study_Guide.pdf"

story = []
styles = getSampleStyleSheet()

# Custom styles
styles.add(ParagraphStyle(name='TitleStyle', parent=styles['Title'], fontName='Helvetica-Bold', fontSize=22, leading=28, textColor=colors.HexColor('#1f2937'), spaceAfter=18))
styles.add(ParagraphStyle(name='Heading1', parent=styles['Heading1'], fontName='Helvetica-Bold', fontSize=16, leading=20, textColor=colors.HexColor('#111827'), spaceBefore=18, spaceAfter=10))
styles.add(ParagraphStyle(name='Body', parent=styles['BodyText'], fontName='Helvetica', fontSize=10.5, leading=16, textColor=colors.HexColor('#1f2937')))
styles.add(ParagraphStyle(name='SmallBold', parent=styles['BodyText'], fontName='Helvetica-Bold', fontSize=10.5, leading=16, textColor=colors.HexColor('#111827')))
styles.add(ParagraphStyle(name='Code', parent=styles['BodyText'], fontName='Courier', fontSize=9.2, leading=14, backColor=colors.HexColor('#f3f4f6'), borderPadding=6, borderColor=colors.HexColor('#d1d5db'), borderWidth=0.5, spaceBefore=6, spaceAfter=8))

# Helper renderer

def add_para(text, style='Body'):
    story.append(Paragraph(text, styles[style]))


def add_code(text):
    story.append(Paragraph(text, styles['Code']))


# Title page
story.append(Paragraph('BankDash App Study Guide', styles['TitleStyle']))
story.append(Paragraph('Easy explanation of your project in simple language', styles['Body']))
story.append(Spacer(1, 20))
story.append(Paragraph('Prepared for learning and revision', styles['SmallBold']))
story.append(PageBreak())

# Intro
add_para('This project is a finance dashboard app built with React, React Router, Tailwind CSS, and mock APIs. The goal is to show banking data like dashboard stats, transactions, accounts, investments, loans, services, and settings. It looks like a real banking dashboard, but the data is fake and loaded from a mock server.')

add_para('In simple words: the app has a sidebar, a top bar, many pages, charts, cards, and mock data. It is designed to look modern and professional, just like a financial dashboard used by a bank or finance team.')
story.append(PageBreak())

# 1. App structure
add_para('1. How the project is arranged', 'Heading1')
add_para('The app is divided into a few important areas:')
items = [
    'src/main.jsx - starts the app',
    'src/App.jsx - loads the router',
    'src/routes/index.jsx - decides which page to show',
    'src/components/layout/ - shared layout, sidebar, top bar',
    'src/features/ - each page like Dashboard, Transactions, Accounts, Settings',
    'src/api/ - API client and mock data',
    'src/utils/ - helper functions for formatting and classes',
]
story.append(ListFlowable(items=[ListItem(Paragraph(item, styles['Body'])) for item in items], bulletType='bullet', bulletText='•'))

# 2. main.jsx
add_para('2. The app begins in src/main.jsx', 'Heading1')
add_code("import { StrictMode } from 'react'\nimport { createRoot } from 'react-dom/client'\nimport './index.css'\nimport App from './App.jsx'\nimport { startMockServer } from './api/mock/server'\n\nstartMockServer()\n\ncreateRoot(document.getElementById('root')).render(\n  <StrictMode>\n    <App />\n  </StrictMode>,\n)")
add_para('What this means:')
items = [
    'React starts in StrictMode to help detect problems during development.',
    'The app is mounted into the HTML element with id=root.',
    'startMockServer() starts fake API data before the app loads.',
    'The app is then rendered using <App />.',
]
story.append(ListFlowable(items=[ListItem(Paragraph(item, styles['Body'])) for item in items], bulletType='bullet', bulletText='•'))

# 3. App.jsx
add_para('3. src/App.jsx connects the router', 'Heading1')
add_code("import { RouterProvider } from 'react-router-dom'\nimport { router } from './routes'\n\nexport default function App() {\n  return <RouterProvider router={router} />\n}")
add_para('This file is simple but important. It says:')
items = [
    'Use the router from react-router-dom.',
    'The router decides which page should appear based on the URL.',
    'RouterProvider is like a traffic controller for pages.',
]
story.append(ListFlowable(items=[ListItem(Paragraph(item, styles['Body'])) for item in items], bulletType='bullet', bulletText='•'))

# 4. routes
add_para('4. Routing in src/routes/index.jsx', 'Heading1')
add_code("const DashboardPage = lazy(() =>\n  import('../features/dashboard/DashboardPage').then((m) => ({\n    default: m.DashboardPage,\n  })),\n)\n\nexport const router = createBrowserRouter([\n  {\n    path: '/',\n    element: <AppLayout />,\n    children: [\n      { index: true, element: withSuspense(DashboardPage) },\n      { path: 'transactions', element: withSuspense(TransactionsPage) },\n      { path: 'accounts', element: withSuspense(AccountsPage) },\n      { path: '*', element: <NotFoundPage /> },\n    ],\n  },\n])")
add_para('This file does the following:')
items = [
    'Each page is lazy loaded using lazy() so the app loads faster.',
    'withSuspense() shows a loading skeleton while the page is still loading.',
    'The root route uses AppLayout to keep the same sidebar and top bar across pages.',
    'The URL tells React which page to render.',
    'Unknown routes go to NotFoundPage.',
]
story.append(ListFlowable(items=[ListItem(Paragraph(item, styles['Body'])) for item in items], bulletType='bullet', bulletText='•'))

# 5. AppLayout
add_para('5. The shared screen layout: AppLayout', 'Heading1')
add_code("export function AppLayout() {\n  const [mobileNavOpen, setMobileNavOpen] = useState(false)\n  const location = useLocation()\n\n  return (\n    <div className=\"flex min-h-screen bg-surface-page\">\n      <DesktopSidebar />\n      <MobileSidebarDrawer open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />\n\n      <div className=\"flex min-w-0 flex-1 flex-col\">\n        <Topbar onOpenMenu={() => setMobileNavOpen(true)} />\n        <main className=\"flex-1\">\n          <AnimatePresence mode=\"wait\">\n            <PageWrapper key={location.pathname}>\n              <Outlet />\n            </PageWrapper>\n          </AnimatePresence>\n        </main>\n      </div>\n    </div>\n  )\n}")
add_para('This is the main shell of the app. It contains:')
items = [
    'Desktop sidebar for large screens.',
    'Mobile drawer for smaller screens.',
    'Top bar with actions and menu button.',
    'Outlet where the actual page content is displayed.',
    'AnimatePresence for smooth page transitions.',
]
story.append(ListFlowable(items=[ListItem(Paragraph(item, styles['Body'])) for item in items], bulletType='bullet', bulletText='•'))

# 6. API client
add_para('6. API client in src/api/client.js', 'Heading1')
add_code("import axios from 'axios'\n\nexport const apiClient = axios.create({\n  baseURL: '/api',\n  timeout: 10000,\n  headers: { 'Content-Type': 'application/json' },\n})\n\napiClient.interceptors.response.use(\n  (response) => response.data,\n  (error) => Promise.reject(error.response?.data ?? error),\n)")
add_para('This file creates one central HTTP client. Why it matters:')
items = [
    'All API calls use the same settings.',
    'baseURL is /api so the app knows the server location.',
    'timeout prevents requests from hanging forever.',
    'The response interceptor strips the extra axios wrapper and gives only the real data.',
]
story.append(ListFlowable(items=[ListItem(Paragraph(item, styles['Body'])) for item in items], bulletType='bullet', bulletText='•'))

# 7. Mock backend
add_para('7. Mock server in src/api/mock/server.js', 'Heading1')
add_para('This file acts like a fake backend. It is very useful when you are building front-end apps and do not have a real server yet.')
add_code("export function startMockServer() {\n  const mock = new MockAdapter(apiClient, { delayResponse: 350 })\n\n  mock.onGet('/dashboard/overview').reply(200, {\n    cards: dashboard.dashboardCards,\n    recentTransactions: dashboard.recentTransactions,\n    weeklyActivity: dashboard.weeklyActivity,\n  })\n\n  mock.onGet('/transactions').reply((config) => {\n    const params = new URLSearchParams(config.params)\n    const search = (params.get('search') || '').toLowerCase()\n    const category = params.get('category') || 'All'\n\n    let result = transactions\n    if (search) {\n      result = result.filter((t) => t.description.toLowerCase().includes(search))\n    }\n    if (category !== 'All') {\n      result = result.filter((t) => t.category === category)\n    }\n\n    return [200, { transactions: result, categories: transactionCategories }]\n  })\n}")
add_para('This means:')
items = [
    'When the app asks for /dashboard/overview, it gets sample dashboard data.',
    'When the app asks for /transactions, it filters by search and category.',
    'This makes the app behave like a real app without a backend.',
    'The mock server also supports PUT requests for settings update simulation.',
]
story.append(ListFlowable(items=[ListItem(Paragraph(item, styles['Body'])) for item in items], bulletType='bullet', bulletText='•'))

# 8. Sidebar navigation
add_para('8. Sidebar routing config', 'Heading1')
add_code("export const navItems = [\n  { path: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },\n  { path: '/transactions', label: 'Transactions', icon: Wallet2 },\n  { path: '/accounts', label: 'Accounts', icon: User },\n  { path: '/investments', label: 'Investments', icon: Landmark },\n  { path: '/credit-cards', label: 'Credit Cards', icon: CreditCard },\n  { path: '/loans', label: 'Loans', icon: HandCoins },\n  { path: '/services', label: 'Services', icon: Wrench },\n  { path: '/settings', label: 'Setting', icon: Settings },\n]")
add_para('The sidebar menu is a simple list of route objects. Each item has:')
items = [
    'a path',
    'a label shown on screen',
    'an icon',
    'an end flag for exact matching on the home route',
]
story.append(ListFlowable(items=[ListItem(Paragraph(item, styles['Body'])) for item in items], bulletType='bullet', bulletText='•'))

# 9. Flow of data
add_para('9. How the app works step by step', 'Heading1')
items = [
    'The browser opens the app.',
    'main.jsx starts the mock server and renders the root component.',
    'App.jsx loads the router.',
    'The URL decides which page to show.',
    'The selected page uses a fetch or API call to a mock route.',
    'The mock server returns JSON data.',
    'React stores that data in component state or uses hooks to render UI.',
    'Charts, cards, tables, and forms appear on screen.',
]
story.append(ListFlowable(items=[ListItem(Paragraph(item, styles['Body'])) for item in items], bulletType='bullet', bulletText='•'))

# 10. Important React ideas in this project
add_para('10. Important React ideas used here', 'Heading1')
add_para('This project uses several common React patterns:')
items = [
    'Component-based design: each part is a reusable component.',
    'Props: parent components pass data to child components.',
    'State: values like mobile menu open/closed are stored in state.',
    'Lazy loading: page components load when needed.',
    'Routing: React Router controls navigation between pages.',
    'Mock API: fake data speeds up front-end development',
]
story.append(ListFlowable(items=[ListItem(Paragraph(item, styles['Body'])) for item in items], bulletType='bullet', bulletText='•'))

# 11. Simple learning summary
add_para('11. Simple summary', 'Heading1')
add_para('If you remember only one thing, remember this:')
add_para('This project is a dashboard frontend built with React. It uses a router to switch pages, a shared layout for the whole app, and a mock API to simulate real backend data. The UI is built from reusable components, and the app is designed to look like a modern bank dashboard.')

# 12. Study checklist
add_para('12. Quick checklist', 'Heading1')
items = [
    'Can you explain the role of main.jsx?',
    'Can you explain what AppLayout does?',
    'Can you describe how routing works?',
    'Can you explain why the mock server is useful?',
    'Can you tell the difference between a component, a route, and an API call?',
]
story.append(ListFlowable(items=[ListItem(Paragraph(item, styles['Body'])) for item in items], bulletType='bullet', bulletText='•'))

# End
story.append(Spacer(1, 20))
story.append(Paragraph('End of study guide', styles['SmallBold']))

# Build PDF
pdf = SimpleDocTemplate(OUTPUT, pagesize=A4, rightMargin=40, leftMargin=40, topMargin=40, bottomMargin=40)
pdf.build(story)
print(f'Created PDF: {OUTPUT}')
