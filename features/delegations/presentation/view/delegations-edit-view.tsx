import React from 'react'

import { useDelegationsStore } from '../../context/delegations-store'
import { EditBreadCrumb } from '../components/edit-breadcrumb'
import { NewEditForm } from '../components/new-edit-form'

export const DelegationsEditView = ({ id }: { id: number }) => {
  const { delegations } = useDelegationsStore()
  const currentDelegation = delegations.find((delegation) => delegation.id === id)
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="h-3/5 w-3/4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Delegaciones</h1>
          </div>
          <EditBreadCrumb />
          <div className="mt-4 ">
            <NewEditForm currentDelegation={currentDelegation} />
          </div>
        </div>
      </div>
    </>
  )
}
