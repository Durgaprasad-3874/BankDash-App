import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../utils/cn'

export function Pagination({ page, pageCount, onChange }) {
  if (pageCount <= 1) return null

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1)

  return (
    <nav
      aria-label="Pagination"
      className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:justify-end"
    >
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-ink-muted transition-colors hover:bg-surface-field disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronLeft size={14} /> Previous
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          aria-current={p === page ? 'page' : undefined}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-colors',
            p === page
              ? 'bg-primary text-white'
              : 'text-ink-muted hover:bg-surface-field',
          )}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        disabled={page === pageCount}
        onClick={() => onChange(page + 1)}
        className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-ink-muted transition-colors hover:bg-surface-field disabled:pointer-events-none disabled:opacity-40"
      >
        Next <ChevronRight size={14} />
      </button>
    </nav>
  )
}
