import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { useMemo, useState } from 'react'
import { cn } from '../../utils/cn'

export function DataTable({
  columns,
  data,
  keyField = 'id',
  emptyMessage = 'No records found.',
}) {
  const [sort, setSort] = useState({ key: null, direction: 'asc' })

  const sortedData = useMemo(() => {
    if (!sort.key) return data
    const column = columns.find((c) => c.key === sort.key)
    const sorted = [...data].sort((a, b) => {
      const valueA = column?.sortValue ? column.sortValue(a) : a[sort.key]
      const valueB = column?.sortValue ? column.sortValue(b) : b[sort.key]
      if (valueA < valueB) return sort.direction === 'asc' ? -1 : 1
      if (valueA > valueB) return sort.direction === 'asc' ? 1 : -1
      return 0
    })
    return sorted
  }, [data, sort, columns])

  function toggleSort(key) {
    setSort((prev) => {
      if (prev.key !== key) return { key, direction: 'asc' }
      if (prev.direction === 'asc') return { key, direction: 'desc' }
      return { key: null, direction: 'asc' }
    })
  }

  if (!data.length) {
    return <p className="py-10 text-center text-sm text-ink-muted">{emptyMessage}</p>
  }

  return (
    <>
      {/* Desktop / tablet table */}
      <div className="hidden overflow-x-auto scrollbar-thin sm:block">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-surface-border text-xs uppercase tracking-wide text-ink-muted">
              {columns.map((column) => (
                <th key={column.key} scope="col" className="py-3 pr-4 font-medium">
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(column.key)}
                      className="flex items-center gap-1 hover:text-ink"
                    >
                      {column.label}
                      {sort.key === column.key ? (
                        sort.direction === 'asc' ? (
                          <ArrowUp size={12} />
                        ) : (
                          <ArrowDown size={12} />
                        )
                      ) : (
                        <ArrowUpDown size={12} className="opacity-40" />
                      )}
                    </button>
                  ) : (
                    column.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row) => (
              <tr
                key={row[keyField]}
                className="border-b border-surface-border/60 last:border-0 hover:bg-surface-field/60"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn('py-4 pr-4 text-ink-soft', column.cellClassName)}
                  >
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <ul className="space-y-3 sm:hidden">
        {sortedData.map((row) => (
          <li
            key={row[keyField]}
            className="rounded-xl border border-surface-border p-4 text-sm"
          >
            {columns.map((column) => (
              <div
                key={column.key}
                className="flex items-center justify-between gap-3 py-1"
              >
                <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                  {column.label}
                </span>
                <span className="text-right text-ink-soft">
                  {column.render ? column.render(row) : row[column.key]}
                </span>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </>
  )
}
