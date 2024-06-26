import { useEffect } from 'react'

import { ReportsDatasourceImpl } from '../services/Datasource'

export function useReportsView() {
  const { mostSoldProducts, mostSoldSevices, transactionReportByYear, transactionReportByEmployee } =
    ReportsDatasourceImpl.getInstance()

  useEffect(() => {
    mostSoldProducts().then((data) => console.log(data))
    mostSoldSevices().then((data) => console.log(data))
    transactionReportByYear(2021).then((data) => console.log(data))
    transactionReportByEmployee(1).then((data) => console.log(data))
  }, [mostSoldProducts, mostSoldSevices, transactionReportByYear, transactionReportByEmployee])

  return {}
}
