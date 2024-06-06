import React from 'react'

import { useConsumersStore } from '../../context/consumers-store'
import { EditBreadCrumb } from '../components/edit-breadcrumb'
import { NewEditForm } from '../components/new-edit-form'

export const CategoriesEditView = ({ id }: { id: number }) => {
  const { consumers } = useConsumersStore()
  const currentBrand = consumers.find((consumer) => consumer.id === id)
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="h-3/5 w-3/4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Consumidores</h1>
          </div>
          <EditBreadCrumb />
          <div className="mt-4 ">
            <NewEditForm currentConsumer={currentBrand} />
          </div>
        </div>
      </div>
    </>
  )
}
