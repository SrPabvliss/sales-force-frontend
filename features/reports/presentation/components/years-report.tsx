import { FC, useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useReportsView } from '../../hooks/use-reports-view'
import { ITransactionYear } from '../../models/IReports'

interface YearReportProps {
  initialYear: number
}

const YearReport: FC<YearReportProps> = ({ initialYear }) => {
  const { years, fetchTransactionByYear } = useReportsView()
  const [data, setData] = useState<ITransactionYear | null>(null)
  const [selectedYear, setSelectedYear] = useState<number>(initialYear)

  useEffect(() => {
    fetchTransactionByYear(selectedYear).then(setData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear])

  const chartData = data
    ? Object.keys(data).map((key) => ({ month: Number(key), total: data[key as keyof ITransactionYear] }))
    : []

  return (
    <div className="flex flex-col">
      <div className="self-end">
        <Select onValueChange={(value) => setSelectedYear(Number(value))} value={selectedYear.toString()}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecciona un año" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Años</SelectLabel>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default YearReport
