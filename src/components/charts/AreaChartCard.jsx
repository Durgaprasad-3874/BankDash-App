import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardHeader } from '../common/Card'
import { ChartFrame } from './ChartFrame'
import { chartColors, chartTooltipStyle } from '../../utils/chartTheme'

export function AreaChartCard({
  title,
  data,
  xKey,
  yKey,
  color = chartColors.primary,
  className,
  height = 260,
}) {
  const gradientId = `area-gradient-${yKey}`

  return (
    <Card className={className}>
      <CardHeader title={title} />
      <ChartFrame height={height}>
        {(width) => (
          <ResponsiveContainer key={width} width={width} height={height}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke={chartColors.grid} />
              <XAxis
                dataKey={xKey}
                axisLine={false}
                tickLine={false}
                tick={{ fill: chartColors.axis, fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: chartColors.axis, fontSize: 12 }}
              />
              <Tooltip {...chartTooltipStyle} />
              <Area
                type="monotone"
                dataKey={yKey}
                stroke={color}
                strokeWidth={2.5}
                fill={`url(#${gradientId})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </ChartFrame>
    </Card>
  )
}
