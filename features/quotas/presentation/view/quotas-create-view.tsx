import React from 'react'

import { CreateBreadCrumb } from '../components/create-breadcrumb'
import { NewEditForm } from '../components/new-edit-form'

export const QuotasCreateView = () => {
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="h-3/5 w-3/4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Cuotas</h1>
          </div>
          <CreateBreadCrumb />
          <div className="mt-4 ">
            <NewEditForm />
          </div>
        </div>
      </div>
    </>
  )
}
