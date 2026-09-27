import { NavLink } from 'react-router-dom'
import { CreditCard } from 'lucide-react'
import { navItems } from '../../routes/navigation'
import { cn } from '../../utils/cn'

export function SidebarNav({ onNavigate }) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-10 flex items-center gap-2 px-2">
        <CreditCard size={22} className="text-primary-700" />
        <span className="text-lg font-bold text-ink-soft">BankDash.</span>
      </div>

      <nav aria-label="Primary" className="flex-1 space-y-1">
        {navItems.map(({ path, label, icon: Icon, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-ink-muted transition-colors duration-200 ease-smooth hover:text-primary',
                isActive && 'bg-primary-50 text-primary',
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
                )}
                <Icon
                  size={20}
                  className={cn(
                    isActive ? 'text-primary' : 'text-ink-muted group-hover:text-primary',
                  )}
                />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
