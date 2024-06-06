import { Button } from '@/components/ui/button'

import { useProductsView } from '../../hooks/use-products-view'
import { ProductsTable } from '../components/DataTable/products-table'
import { TableBreadCrumb } from '../components/table-breadcrumb'

export const ProductsListView = () => {
  const { products, handleDelete, handleEdit, handleAdd } = useProductsView()
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="h-3/5 w-3/4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Productos</h1>
            <Button onClick={() => handleAdd()}>Nuevo producto</Button>
          </div>
          <TableBreadCrumb />
          <div className="mt-4">
            <ProductsTable data={products} handleDelete={handleDelete} handleEdit={handleEdit} />
          </div>
        </div>
      </div>
    </>
  )
}
