import Example from '../components/employee-report'
import { EmployeesBreadCrumb } from '../components/employees-breadcrumb'

export const EmployeesReportsView = () => {
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center ">
        <div className="h-3/5 w-3/4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Reporte de empleados</h1>
          </div>
          <EmployeesBreadCrumb />
          <div className="mt-4"></div>
          <Example />
        </div>
      </div>
    </>
  )
}
