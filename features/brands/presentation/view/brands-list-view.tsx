import { Button } from '@/components/ui/button'

import { useBrandsView } from '../../hooks/use-brands-view'
import { BrandTable } from '../components/DataTable/BrandTable'
import { TableBreadCrumb } from '../components/TableBreadCrumb'

export const BrandsListView = () => {
  const { brands, handleDelete, handleEdit, handleAdd } = useBrandsView()
  return (
    <>
      <div className="p-32 px-64">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Marcas</h1>
          <Button onClick={() => handleAdd()}>Nueva Marca</Button>
        </div>
        <TableBreadCrumb />
        <div className="mt-4">
          <BrandTable data={brands} handleDelete={handleDelete} handleEdit={handleEdit} />
        </div>
      </div>
    </>
  )
}
