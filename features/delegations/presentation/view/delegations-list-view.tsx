import { Button } from '@/components/ui/button'

import { useDelegationsView } from '../../hooks/use-delegations-view'
import { DelegationsTable } from '../components/DataTable/delegations-table'
import { TableBreadCrumb } from '../components/table-breadcrumb'

export const DelegationsListView = () => {
  const { delegations, handleDelete, handleEdit, handleAdd } = useDelegationsView()
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="h-3/5 w-3/4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Delegaciones</h1>
            <Button onClick={() => handleAdd()}>Nueva delegación</Button>
          </div>
          <TableBreadCrumb />
          <div className="mt-4">
            <DelegationsTable data={delegations} handleDelete={handleDelete} handleEdit={handleEdit} />
          </div>
        </div>
      </div>
    </>
  )
}
