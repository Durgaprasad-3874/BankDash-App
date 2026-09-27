import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { Card } from '../../../components/common/Card'
import { ChartFrame } from '../../../components/charts/ChartFrame'
import { chartColors, chartTooltipStyle } from '../../../utils/chartTheme'
import { formatCurrency } from '../../../utils/format'

export function MyExpenseCard({ data }) {
  const peak = data.reduce((max, item) => (item.value > max.value ? item : max), data[0])

  return (
    <Card className="flex flex-col">
      <p className="text-lg font-semibold text-ink-soft">My Expense</p>
      <p className="mt-1 text-2xl font-bold text-ink">{formatCurrency(peak.value)}</p>
      <div className="mt-2 flex-1">
        <ChartFrame height={120}>
          {(width) => (
            <ResponsiveContainer key={width} width={width} height={120}>
              <BarChart data={data}>
                <Tooltip {...chartTooltipStyle} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={18}>
                  {data.map((entry) => (
                    <Cell
                      key={entry.month}
                      fill={entry.month === peak.month ? chartColors.teal : '#E6EFF5'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartFrame>
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-ink-muted">
        {data.map((entry) => (
          <span key={entry.month}>{entry.month}</span>
        ))}
      </div>
    </Card>
  )
}
