import { Button } from '@/components/ui/button'

import { useCategoriesView } from '../../hooks/use-categories-view'
import { CategoriesTable } from '../components/DataTable/category-table'
import { TableBreadCrumb } from '../components/table-breadcrumb'

export const CategoriesListView = () => {
  const { categories, handleDelete, handleEdit, handleAdd } = useCategoriesView()
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="h-3/5 w-3/4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Categorías</h1>
            <Button onClick={() => handleAdd()}>Nueva categoría</Button>
          </div>
          <TableBreadCrumb />
          <div className="mt-4">
            <CategoriesTable data={categories} handleDelete={handleDelete} handleEdit={handleEdit} />
          </div>
        </div>
      </div>
    </>
  )
}
