import React from 'react'

import { useQuotasStore } from '../../context/quotas-store'
import { EditBreadCrumb } from '../components/edit-breadcrumb'
import { NewEditForm } from '../components/new-edit-form'

export const QuotasEditView = ({ id }: { id: number }) => {
  const { quotas } = useQuotasStore()
  const currentQuota = quotas.find((quotas) => quotas.id === id)
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="h-3/5 w-3/4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Cuotas</h1>
          </div>
          <EditBreadCrumb />
          <div className="mt-4 ">
            <NewEditForm currentQuota={currentQuota} />
          </div>
        </div>
      </div>
    </>
  )
}
