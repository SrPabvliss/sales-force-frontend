import { UseAccountStore } from '@/features/auth/context/useUserStore'
import { EmployeeRole } from '@/features/auth/models/IUser'

import { Button } from '@/components/ui/button'

import { useLocationsView } from '../../hooks/use-locations-view'
import { LocationsTable } from '../components/DataTable/locations-table'
import { TableBreadCrumb } from '../components/table-breadcrumb'

export const LocationsListView = () => {
  const { locations, handleDelete, handleEdit, handleAdd } = useLocationsView()
  const { user } = UseAccountStore()
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="h-3/5 w-3/4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Ubicaciones</h1>
            {user?.role === EmployeeRole.ADMIN && <Button onClick={() => handleAdd()}>Nueva ubicación</Button>}
          </div>
          <TableBreadCrumb />
          <div className="mt-4">
            <LocationsTable data={locations} handleDelete={handleDelete} handleEdit={handleEdit} />
          </div>
        </div>
      </div>
    </>
  )
}
