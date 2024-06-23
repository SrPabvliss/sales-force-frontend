import { Button } from '@/components/ui/button'

import { useChancesView } from '../../hooks/use-chances-view'
import { ChancesTable } from '../components/DataTable/chances-table'
import { TableBreadCrumb } from '../components/table-breadcrumb'

export const ChancesListView = () => {
  const { chances, handleDelete, updateChanceStatus, handleAdd } = useChancesView()
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="h-3/5 w-3/4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Oportunidades</h1>
            <Button onClick={() => handleAdd()}>Nueva oportunidad</Button>
          </div>
          <TableBreadCrumb />
          <div className="mt-4">
            <ChancesTable data={chances} handleDelete={handleDelete} handleUpdateStatus={updateChanceStatus} />
          </div>
        </div>
      </div>
    </>
  )
}
