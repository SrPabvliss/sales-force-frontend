import { SalesBreadCrumb } from '../components/sales-breadcrumb'

export const SalesReportsView = () => {
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center ">
        <div className="h-3/5 w-3/4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Reporte de ventas</h1>
          </div>
          <SalesBreadCrumb />
          <div className="mt-4"></div>
        </div>
      </div>
    </>
  )
}
