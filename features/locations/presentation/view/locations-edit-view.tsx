import React from 'react'

import { useLocationsStore } from '../../context/locations-store'
import { EditBreadCrumb } from '../components/edit-breadcrumb'
import { NewEditForm } from '../components/new-edit-form'

export const LocationsEditView = ({ id }: { id: number }) => {
  const { locations } = useLocationsStore()
  const foundLocation = locations.find((category) => category.id === id)

  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="h-3/5 w-3/4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Ubicaciones</h1>
          </div>
          <EditBreadCrumb />
          <div className="mt-4 ">
            <NewEditForm currentLocation={foundLocation} />
          </div>
        </div>
      </div>
    </>
  )
}
