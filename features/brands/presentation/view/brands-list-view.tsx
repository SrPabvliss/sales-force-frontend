import { Button } from '@/components/ui/button'

import { useBrandsView } from '../../hooks/use-brands-view'
import { BrandTable } from '../components/DataTable/brand-table'
import { TableBreadCrumb } from '../components/table-breadcrumb'

export const BrandsListView = () => {
  const { brands, handleDelete, handleEdit, handleAdd } = useBrandsView()
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="h-3/5 w-3/4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Marcas</h1>
            <Button onClick={() => handleAdd()}>Nueva Marca</Button>
          </div>
          <TableBreadCrumb />
          <div className="mt-4">
            <BrandTable data={brands} handleDelete={handleDelete} handleEdit={handleEdit} />
          </div>
        </div>
      </div>
    </>
  )
}
