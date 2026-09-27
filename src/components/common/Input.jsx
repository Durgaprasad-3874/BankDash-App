import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

export const Input = forwardRef(function Input(
  { className, label, error, icon, id, ...props },
  ref,
) {
  const inputId = id || props.name

  return (
    <label htmlFor={inputId} className="block">
      {label && (
        <span className="mb-2 block text-xs font-medium text-ink-muted">{label}</span>
      )}
      <span className="relative flex items-center">
        {icon && (
          <span className="pointer-events-none absolute left-4 text-ink-muted">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            'h-11 w-full rounded-xl border border-transparent bg-surface-field px-4 text-sm text-ink placeholder:text-ink-faint focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100 transition-colors duration-200',
            icon && 'pl-11',
            error && 'border-danger focus:border-danger focus:ring-red-100',
            className,
          )}
          {...props}
        />
      </span>
      {error && <span className="mt-1 block text-xs text-danger">{error}</span>}
    </label>
  )
})
