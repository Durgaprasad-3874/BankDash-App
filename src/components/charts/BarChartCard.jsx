import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardHeader } from '../common/Card'
import { ChartFrame } from './ChartFrame'
import { chartColors, chartTooltipStyle } from '../../utils/chartTheme'

export function BarChartCard({ title, data, xKey, bars, className, height = 260 }) {
  return (
    <Card className={className}>
      <CardHeader title={title} />
      <ChartFrame height={height}>
        {(width) => (
          <ResponsiveContainer key={width} width={width} height={height}>
            <BarChart data={data} barGap={6}>
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
              <Legend
                iconType="circle"
                wrapperStyle={{ fontSize: 12, color: chartColors.axis }}
              />
              {bars.map((bar) => (
                <Bar
                  key={bar.key}
                  dataKey={bar.key}
                  name={bar.name}
                  fill={bar.color}
                  radius={[6, 6, 0, 0]}
                  maxBarSize={14}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartFrame>
    </Card>
  )
}
