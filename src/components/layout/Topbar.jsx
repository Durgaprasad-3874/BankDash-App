import { Bell, LogOut, Menu, Search, Settings, User } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { Avatar } from '../common/Avatar'
import { Dropdown, DropdownItem } from '../common/Dropdown'
import { IconButton } from '../common/IconButton'
import { navItems } from '../../routes/navigation'
import { currentUser } from '../../utils/currentUser'

export function Topbar({ onOpenMenu }) {
  const location = useLocation()
  const current = navItems.find((item) =>
    item.end ? location.pathname === item.path : location.pathname.startsWith(item.path),
  )
  const heading = location.pathname === '/' ? 'Overview' : (current?.label ?? 'Overview')

  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-surface-border bg-surface-page/80 px-4 py-5 backdrop-blur md:px-8">
      <IconButton label="Open navigation" onClick={onOpenMenu} className="md:hidden">
        <Menu size={22} />
      </IconButton>

      <h1 className="hidden text-xl font-semibold text-ink md:block">{heading}</h1>

      <div className="ml-auto flex flex-1 items-center justify-end gap-3 md:flex-none md:gap-5">
        <label className="relative hidden w-full max-w-xs sm:block">
          <span className="sr-only">Search</span>
          <Search
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted"
          />
          <input
            type="search"
            placeholder="Search for something"
            className="h-11 w-full rounded-xl bg-surface-field pl-11 pr-4 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-primary-100"
          />
        </label>

        <IconButton label="Settings">
          <Settings size={20} className="text-ink-muted" />
        </IconButton>

        <IconButton label="Notifications">
          <Bell size={20} className="text-accent-pink" />
        </IconButton>

        <Dropdown
          trigger={<Avatar name={currentUser.name} src={currentUser.avatar} size="sm" />}
        >
          <DropdownItem>
            <User size={16} /> Profile
          </DropdownItem>
          <DropdownItem>
            <Settings size={16} /> Settings
          </DropdownItem>
          <DropdownItem className="text-danger hover:bg-danger/10">
            <LogOut size={16} /> Log out
          </DropdownItem>
        </Dropdown>
      </div>
    </header>
  )
}
