import React from 'react'

import { useCategoriesStore } from '../../context/categories-store'
import { EditBreadCrumb } from '../components/edit-breadcrumb'
import { NewEditForm } from '../components/new-edit-form'

export const CategoriesEditView = ({ id }: { id: number }) => {
  const { categories } = useCategoriesStore()
  const currentBrand = categories.find((category) => category.id === id)
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="h-3/5 w-3/4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Categorías</h1>
          </div>
          <EditBreadCrumb />
          <div className="mt-4 ">
            <NewEditForm currentCategory={currentBrand} />
          </div>
        </div>
      </div>
    </>
  )
}
