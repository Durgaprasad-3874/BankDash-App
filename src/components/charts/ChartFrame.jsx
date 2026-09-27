import { useElementSize } from '../../hooks/useElementSize'

/**
 * Recharts' ResponsiveContainer sometimes freezes at a stale (too-narrow) width
 * after route transitions or sidebar/layout shifts, leaving dead space in the
 * card. Measuring the wrapper ourselves and remounting the chart by `key` when
 * the width changes forces a correct redraw every time.
 */
export function ChartFrame({ height, children }) {
  const [ref, { width }] = useElementSize()

  return (
    <div ref={ref} style={{ width: '100%', height }}>
      {width > 0 && children(Math.round(width))}
    </div>
  )
}
