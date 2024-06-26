import { FC } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

import { IMostSoldItem } from '../../models/IReports'

interface MostSoldReportProps {
  data: IMostSoldItem[]
  title: string
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const MostSoldReport: FC<MostSoldReportProps> = ({ data, title }) => (
  <div className="report-container">
    <h2 className="mb-4 text-lg font-semibold">{title}</h2>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="quantity" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
)

export default MostSoldReport
