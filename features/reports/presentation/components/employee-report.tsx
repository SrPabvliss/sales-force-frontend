import { FC, useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

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
import { ITransactionEmployee } from '../../models/IReports'

interface EmployeeReportProps {
  initialEmployeeId: number
}

const EmployeeReport: FC<EmployeeReportProps> = ({ initialEmployeeId }) => {
  const { employees, fetchTransactionByEmployee } = useReportsView()
  const [data, setData] = useState<ITransactionEmployee[]>([])
  const [selectedEmployee, setSelectedEmployee] = useState<number>(initialEmployeeId)

  useEffect(() => {
    fetchTransactionByEmployee(selectedEmployee).then(setData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEmployee])

  return (
    <div className="flex flex-col">
      <div className="self-end">
        <Select onValueChange={(value: any) => setSelectedEmployee(Number(value))} value={selectedEmployee.toString()}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecciona un empleado" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Empleados</SelectLabel>
              {employees.map((employee) => (
                <SelectItem key={employee.id} value={employee.id.toString()}>
                  {`${employee.person.name} ${employee.person.lastName} `}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default EmployeeReport
