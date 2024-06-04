import React from 'react'

import { CreateBreadCrumb } from '../components/create-breadcrumb'
import { NewEditForm } from '../components/new-edit-form'

export const BrandsCreateView = () => {
  return (
    <>
      <div className="p-32 px-64">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Marcas</h1>
        </div>
        <CreateBreadCrumb />
        <div className="mt-4 ">
          <NewEditForm />
        </div>
      </div>
    </>
  )
}
