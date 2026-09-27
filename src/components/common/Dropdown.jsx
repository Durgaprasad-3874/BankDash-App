import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useClickOutside } from '../../hooks/useClickOutside'
import { cn } from '../../utils/cn'

export function Dropdown({ trigger, children, align = 'right', className }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useClickOutside(ref, () => setOpen(false), open)

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center"
      >
        {trigger}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute z-40 mt-2 min-w-[200px] rounded-xl border border-surface-border bg-surface-card p-2 shadow-cardHover',
              align === 'right' ? 'right-0' : 'left-0',
              className,
            )}
            onClick={() => setOpen(false)}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function DropdownItem({ className, ...props }) {
  return (
    <button
      role="menuitem"
      type="button"
      className={cn(
        'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-ink-soft transition-colors hover:bg-surface-field',
        className,
      )}
      {...props}
    />
  )
}
