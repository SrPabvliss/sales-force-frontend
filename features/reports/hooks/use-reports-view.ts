import { IEmployee } from '@/features/employees/models/IEmployee'
import { EmployeesDatasourceImpl } from '@/features/employees/services/datasource'
import { useState, useEffect } from 'react'

import { ReportsDatasourceImpl } from '../services/Datasource'

export function useReportsView() {
  const [employees, setEmployees] = useState<IEmployee[]>([])
  const [years, setYears] = useState<number[]>([2022, 2023, 2024])

  useEffect(() => {
    EmployeesDatasourceImpl.getInstance().getAll().then(setEmployees)
  }, [])

  return {
    employees,
    years,
    setYears,
    fetchTransactionByEmployee: (employeeId: number) =>
      ReportsDatasourceImpl.getInstance().transactionReportByEmployee(employeeId),
    fetchTransactionByYear: (year: number) => ReportsDatasourceImpl.getInstance().transactionReportByYear(year),
    fetchMostSoldProducts: () => ReportsDatasourceImpl.getInstance().mostSoldProducts(),
    fetchMostSoldServices: () => ReportsDatasourceImpl.getInstance().mostSoldSevices(),
  }
}
