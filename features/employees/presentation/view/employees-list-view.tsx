import { UseAccountStore } from '@/features/auth/context/useUserStore'
import { EmployeeRole } from '@/features/auth/models/IUser'

import { Button } from '@/components/ui/button'

import { useEmployeesView } from '../../hooks/use-employees-view'
import { EmployeesTable } from '../components/DataTable/employees-table'
import { TableBreadCrumb } from '../components/table-breadcrumb'

export const EmployeesListView = () => {
  const { employees, handleDelete, handleEdit, handleAdd } = useEmployeesView()
  const { user } = UseAccountStore()
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="h-3/5 w-3/4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Empleados</h1>
            {user?.role === EmployeeRole.ADMIN && <Button onClick={() => handleAdd()}>Nuevo empleado</Button>}
          </div>
          <TableBreadCrumb />
          <div className="mt-4">
            <EmployeesTable data={employees} handleDelete={handleDelete} handleEdit={handleEdit} />
          </div>
        </div>
      </div>
    </>
  )
}
