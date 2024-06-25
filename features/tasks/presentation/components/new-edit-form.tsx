import { UseAccountStore } from '@/features/auth/context/useUserStore'
import { useDelegationsStore } from '@/features/delegations/context/delegations-store'
import { useEmployeesStore } from '@/features/employees/context/employees-store'
import { FMKDatePicker } from '@/shared/components/formik/FormikDatePicker'
import { FMKSelect } from '@/shared/components/formik/FormikSelect'
import { Form, Formik } from 'formik'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { EmployeeRole } from '../../../auth/models/IUser'
import { useTasksForm } from '../../hooks/use-tasks-form'
import { ITask, TaskType } from '../../models/ITask'
import FMKTimeSelector from './time-selector'

export const NewEditForm = ({ currentTask }: { currentTask?: ITask }) => {
  const { initialValues, handleSubmit, validationSchema } = useTasksForm(currentTask)
  const { employees } = useEmployeesStore()
  const { delegations } = useDelegationsStore()
  const { user } = UseAccountStore()

  return (
    <div className="flex justify-center gap-10">
      <Formik
        initialValues={initialValues as any}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {({ values }) => (
          <>
            <Card className="w-full max-w-2xl p-8">
              <Form className="flex flex-col gap-6">
                <FMKSelect
                  name="employeeId"
                  label="Empleado"
                  options={
                    user?.role !== EmployeeRole.SELLER
                      ? employees.map((employee) => ({
                          label: `${employee.person.name} ${employee.person.lastName} - ${employee.person.dni}`,
                          value: employee.id.toString(),
                        }))
                      : employees
                          .filter((employee) => employee.id === user?.id)
                          .map((employee) => ({
                            label: `${employee.person.name} ${employee.person.lastName} - ${employee.person.dni}`,
                            value: employee.id.toString(),
                          }))
                  }
                />
                <FMKSelect
                  name="delegationId"
                  label="Delegación"
                  options={delegations
                    .filter((delegation) => delegation.employee.id.toString() === (values as any).employeeId)
                    .map((delegation) => ({
                      label: `${delegation.consumer.person.name} ${delegation.consumer.person.lastName} - ${delegation.consumer.person.dni}`,
                      value: delegation.id.toString(),
                    }))}
                />
                <div className="flex gap-2">
                  <div className="flex-1">
                    <FMKSelect
                      name="type"
                      label="Tipo"
                      options={[
                        { label: 'Visita', value: TaskType.VISIT },
                        { label: 'Llamada', value: TaskType.CALL },
                      ]}
                    />
                  </div>
                  <div className="flex-1">
                    <FMKDatePicker name="date" label="Fecha" />
                  </div>
                </div>
                <FMKTimeSelector name="estimatedTime" label="Seleccione un tiempo estimado" />
                <Button type="submit" className="btn-primary">
                  Guardar
                </Button>
              </Form>
            </Card>
          </>
        )}
      </Formik>
    </div>
  )
}
