import React from 'react'

import { useBrandsStore } from '../../context/brands-store'
import { EditBreadCrumb } from '../components/edit-breadcrumb'
import { NewEditForm } from '../components/new-edit-form'

export const BrandsEditView = ({ id }: { id: number }) => {
  const { brands } = useBrandsStore()
  const currentBrand = brands.find((brand) => brand.id === id)
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="h-3/5 w-3/4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Marcas</h1>
          </div>
          <EditBreadCrumb />
          <div className="mt-4 ">
            <NewEditForm currentBrand={currentBrand} />
          </div>
        </div>
      </div>
    </>
  )
}
