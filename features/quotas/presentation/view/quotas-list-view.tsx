import { UseAccountStore } from '@/features/auth/context/useUserStore'
import { EmployeeRole } from '@/features/auth/models/IUser'

import { Button } from '@/components/ui/button'

import { useQuotasView } from '../../hooks/use-quotas-view'
import { QuotasTable } from '../components/DataTable/quotas-table'
import { TableBreadCrumb } from '../components/table-breadcrumb'

export const QuotasListView = () => {
  const { quotas, handleDelete, handleEdit, handleAdd } = useQuotasView()
  const { user } = UseAccountStore()

  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="h-3/5 w-3/4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Cuotas</h1>
            {user?.role === EmployeeRole.ADMIN && <Button onClick={() => handleAdd()}>Nueva cuota</Button>}
          </div>
          <TableBreadCrumb />
          <div className="mt-4">
            <QuotasTable data={quotas} handleDelete={handleDelete} handleEdit={handleEdit} />
          </div>
        </div>
      </div>
    </>
  )
}
