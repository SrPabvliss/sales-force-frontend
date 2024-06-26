import { UseAccountStore } from '@/features/auth/context/useUserStore'
import { EmployeeRole } from '@/features/auth/models/IUser'

import { Button } from '@/components/ui/button'

import { useServicesView } from '../../hooks/use-services-view'
import { ServicesTable } from '../components/DataTable/services-table'
import { TableBreadCrumb } from '../components/table-breadcrumb'

export const ServicesListView = () => {
  const { services, handleDelete, handleEdit, handleAdd } = useServicesView()
  const { user } = UseAccountStore()
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="h-3/5 w-3/4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Servicios</h1>
            {user?.role !== EmployeeRole.SELLER && <Button onClick={() => handleAdd()}>Nuevo servicio</Button>}
          </div>
          <TableBreadCrumb />
          <div className="mt-4">
            <ServicesTable data={services} handleDelete={handleDelete} handleEdit={handleEdit} />
          </div>
        </div>
      </div>
    </>
  )
}
