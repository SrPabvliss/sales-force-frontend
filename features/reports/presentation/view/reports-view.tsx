import { useEffect, useState } from 'react'

import { Card } from '@/components/ui/card'

import { useReportsView } from '../../hooks/use-reports-view'
import { IMostSoldItem } from '../../models/IReports'
import EmployeeReport from '../components/employee-report'
import MostSoldReport from '../components/most-sold-report'
import { ReportsBreadCrumb } from '../components/reports-breadcrumb'
import YearReport from '../components/years-report'

export const ReportsView = () => {
  const { fetchMostSoldProducts, fetchMostSoldServices } = useReportsView()
  const [mostSoldProducts, setMostSoldProducts] = useState<IMostSoldItem[]>([])
  const [mostSoldServices, setMostSoldServices] = useState<IMostSoldItem[]>([])

  useEffect(() => {
    fetchMostSoldProducts().then(setMostSoldProducts)
    fetchMostSoldServices().then(setMostSoldServices)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center py-4">
        <div className="w-full max-w-7xl">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-3xl font-semibold">Reportes</h1>
          </div>
          <ReportsBreadCrumb />
          <div className="mt-4 grid grid-cols-2 gap-8">
            <Card className="rounded p-4 shadow">
              <h2 className="mb-4 text-lg font-semibold">Transacciones por Empleado</h2>
              <EmployeeReport initialEmployeeId={1} />
            </Card>
            <Card className="rounded p-4 shadow">
              <h2 className="mb-4 text-lg font-semibold">Transacciones por Año</h2>
              <YearReport initialYear={2024} />
            </Card>
            <Card className="rounded p-4 shadow">
              <MostSoldReport data={mostSoldProducts} title="Productos Más Vendidos" />
            </Card>
            <Card className="rounded p-4 shadow">
              <MostSoldReport data={mostSoldServices} title="Servicios Más Vendidos" />
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
