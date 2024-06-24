import React from 'react'

import { useTransactionsStore } from '../../context/transactions-store'
import { EditBreadCrumb } from '../components/edit-breadcrumb'
import { NewEditForm } from '../components/new-edit-form'

export const TasksEditView = ({ id }: { id: number }) => {
  const { tasks } = useTransactionsStore()
  const currentTask = tasks.find((delegation) => delegation.id === id)
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="h-3/5 w-3/4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Tareas</h1>
          </div>
          <EditBreadCrumb />
          <div className="mt-4 ">
            <NewEditForm currentTask={currentTask} />
          </div>
        </div>
      </div>
    </>
  )
}
