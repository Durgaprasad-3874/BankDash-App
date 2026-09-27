# BankDash

A responsive finance admin dashboard built from the [BankDash Figma UI kit](https://www.figma.com/design/0RuDULPOgvH0mSHmbIPV0Y/BankDash---Dashboard-UI-Kit---Admin-Template-Dashboard---Admin-Dashboard--figmamarket.com-), implemented with React, Tailwind CSS, React Router, Axios and Framer Motion.

## Design fidelity note

The Figma file above is a paid community/marketplace template. This build was created by extracting design tokens (colors, spacing, radii, layout structure) through Figma's own inspector panel and by studying every screen visually across breakpoints — **not** via full Dev Mode / code-export access, which the connected account didn't have edit rights to. Colors and spacing are very close to the source; exact font metrics and a few pixel values are best-effort approximations. Font family defaults to **Inter** (Google Fonts) as a close match to the source typeface.

## Tech stack

- **React 19 + Vite** — app shell and dev/build tooling
- **Tailwind CSS 3** — utility-first styling, themed via `tailwind.config.js`
- **React Router 7** — client-side routing (`createBrowserRouter`, layout routes)
- **Axios** — typed API layer, backed by `axios-mock-adapter` so the data layer behaves like a real integration even without a backend
- **Framer Motion** — page transitions, sidebar/drawer animation, hover/tap states, modal and tab transitions
- **Recharts** — bar / donut / area / line charts
- **lucide-react** — icon set

## Getting started

```bash
npm install
npm run dev
```

The app runs on `http://localhost:5180` (see `vite.config.js`). No backend is required — `src/api/mock/server.js` registers an in-memory mock API on top of the same Axios instance the app uses for real requests, so swapping in a real backend later only means changing `baseURL` and removing the mock registration in `src/main.jsx`.

Other scripts:

```bash
npm run build     # production build
npm run preview   # preview the production build
npm run lint       # ESLint
npm run format     # Prettier --write
```

## Folder structure

```
src/
  api/
    client.js          # shared axios instance (baseURL, response interceptor)
    endpoints/          # one file per resource — thin, typed request functions
    mock/
      data/              # static dummy data per feature
      server.js          # axios-mock-adapter route registrations
  components/
    common/              # Button, Card, Input, Modal, Avatar, DataTable, Switch, Tabs, ...
    layout/              # Sidebar, Topbar, AppLayout, PageWrapper (route-transition wrapper)
    charts/              # Recharts wrapper components (Bar/Donut/Area/Line + shared theme)
  features/               # one folder per dashboard section
    dashboard/
    transactions/
    accounts/
    investments/
    creditCards/
    loans/
    services/
    settings/
    privileges/          # no dedicated Figma screen for this sidebar item; built as a
                          # lightweight, on-brand placeholder so navigation stays complete
  hooks/                  # useFetch, useDebouncedValue, useMediaQuery, useClickOutside
  routes/                 # router config (code-split per page) + nav config
  utils/                  # formatting helpers, chart theme, cn() class helper
```

Each `features/<name>` folder owns its page component plus any section-specific
sub-components; everything reusable across sections lives in `components/`.

## Design tokens

`tailwind.config.js` extends the default theme with the palette and scale pulled from Figma:

- **Primary gradient**: `#4C49ED → #0A06F4` (buttons, active card)
- **Muted ink**: `#718EBF` (secondary text/icons), `#343C6A` (headings)
- **Surfaces**: `#F5F7FA` page background, white cards, `20–25px` radii
- **Accents**: teal `#16DBCC`, orange `#FF9F43`, pink `#F55EA6`, navy `#232360`

## Responsive behavior

- **Mobile (<640px)**: sidebar becomes a slide-in drawer (hamburger trigger, backdrop, Escape/outside-click to close); data tables render as stacked cards; card rails scroll horizontally.
- **Tablet (768–1024px)**: persistent sidebar, grids collapse from 3/4 columns down to 1–2.
- **Desktop (>1024px)**: full multi-column layout.

## Interactivity implemented

- Client-side routing across all sidebar sections with animated page transitions
- Debounced search + category filter on the Transactions table (server-side filtering via the mock API)
- Sortable data tables (click a column header)
- Credit Cards: "Add New Card" modal with field validation, and live-toggled card settings
- Settings: tabbed Edit Profile / Preferences / Security forms with validation and simulated save
- Sidebar/topbar: animated mobile drawer, notification/profile dropdown, active-route highlighting

## Deployment

This repo is ready to deploy as a static Vite build to Vercel or Netlify:

- **Vercel**: import the repo, framework preset "Vite", build command `npm run build`, output directory `dist`.
- **Netlify**: build command `npm run build`, publish directory `dist`. Add a `_redirects` file with `/* /index.html 200` (or the Netlify SPA setting) so client-side routes don't 404 on refresh.
