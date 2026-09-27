import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Card, CardHeader } from '../common/Card'
import { ChartFrame } from './ChartFrame'
import { chartTooltipStyle } from '../../utils/chartTheme'

const RADIAN = Math.PI / 180

function renderSliceLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.62
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={11}
      fontWeight={600}
    >
      <tspan x={x} dy="-0.3em">
        {Math.round(percent * 100)}%
      </tspan>
      <tspan x={x} dy="1.2em" fontSize={9} fontWeight={400}>
        {name}
      </tspan>
    </text>
  )
}

export function DonutChartCard({
  title,
  data,
  className,
  height = 260,
  variant = 'legend',
}) {
  const isLabeled = variant === 'labels'

  return (
    <Card className={className}>
      <CardHeader title={title} />
      <div className="relative">
        <ChartFrame height={height}>
          {(width) => (
            <ResponsiveContainer key={width} width={width} height={height}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="label"
                  innerRadius={isLabeled ? 0 : '60%'}
                  outerRadius="90%"
                  paddingAngle={isLabeled ? 0 : 2}
                  startAngle={90}
                  endAngle={-270}
                  label={isLabeled ? renderSliceLabel : false}
                  labelLine={false}
                >
                  {data.map((entry) => (
                    <Cell key={entry.label} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip {...chartTooltipStyle} formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </ChartFrame>
      </div>
      {!isLabeled && (
        <ul className="mt-4 flex flex-wrap justify-center gap-4">
          {data.map((entry) => (
            <li
              key={entry.label}
              className="flex items-center gap-2 text-xs text-ink-muted"
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: entry.color }}
                aria-hidden="true"
              />
              {entry.label}
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
