import { Button } from '@/components/ui/button'

import { useConsumersView } from '../../hooks/use-consumers-view'
import { ConsumersTable } from '../components/DataTable/consumer-table'
import { TableBreadCrumb } from '../components/table-breadcrumb'

export const ConsumersListView = () => {
  const { consumers, handleDelete, handleEdit, handleAdd } = useConsumersView()
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="h-3/5 w-3/4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Consumidores</h1>
            <Button onClick={() => handleAdd()}>Nuevo consumidor</Button>
          </div>
          <TableBreadCrumb />
          <div className="mt-4">
            <ConsumersTable data={consumers} handleDelete={handleDelete} handleEdit={handleEdit} />
          </div>
        </div>
      </div>
    </>
  )
}
