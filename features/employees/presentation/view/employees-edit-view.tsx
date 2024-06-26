import React from 'react'

import { useEmployeesStore } from '../../context/employees-store'
import { EditBreadCrumb } from '../components/edit-breadcrumb'
import { NewEditForm } from '../components/new-edit-form'

export const EmployeesEditView = ({ id }: { id: number }) => {
  const { employees } = useEmployeesStore()
  const currentBrand = employees.find((employee) => employee.id === id)
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="h-3/5 w-3/4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Empleados</h1>
          </div>
          <EditBreadCrumb />
          <div className="mt-4 ">
            <NewEditForm currentEmployee={currentBrand} />
          </div>
        </div>
      </div>
    </>
  )
}
