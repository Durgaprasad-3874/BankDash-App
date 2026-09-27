import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardHeader } from '../common/Card'
import { ChartFrame } from './ChartFrame'
import { chartColors, chartTooltipStyle } from '../../utils/chartTheme'

export function LineChartCard({
  title,
  data,
  xKey,
  yKey,
  color = chartColors.orange,
  className,
  height = 220,
}) {
  return (
    <Card className={className}>
      <CardHeader title={title} />
      <ChartFrame height={height}>
        {(width) => (
          <ResponsiveContainer key={width} width={width} height={height}>
            <LineChart data={data}>
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
              <Line
                type="monotone"
                dataKey={yKey}
                stroke={color}
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </ChartFrame>
    </Card>
  )
}
