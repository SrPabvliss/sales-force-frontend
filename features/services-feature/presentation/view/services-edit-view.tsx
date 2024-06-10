import React from 'react'

import { useServicesStore } from '../../context/services-store'
import { EditBreadCrumb } from '../components/edit-breadcrumb'
import { NewEditForm } from '../components/new-edit-form'

export const ServicesEditView = ({ id }: { id: number }) => {
  const { services } = useServicesStore()
  const currentService = services.find((service) => service.id === id)
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="h-3/5 w-3/4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Servicios</h1>
          </div>
          <EditBreadCrumb />
          <div className="mt-4 ">
            <NewEditForm currentService={currentService} />
          </div>
        </div>
      </div>
    </>
  )
}
