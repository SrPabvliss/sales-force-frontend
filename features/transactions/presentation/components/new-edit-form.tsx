import { UseAccountStore } from '@/features/auth/context/useUserStore'
import { useDelegationsStore } from '@/features/delegations/context/delegations-store'
import { useEmployeesStore } from '@/features/employees/context/employees-store'
import { useTasksStore } from '@/features/tasks/context/tasks-store'
import { TaskStatus, TaskType } from '@/features/tasks/models/ITask'
import { FMKDatePicker } from '@/shared/components/formik/FormikDatePicker'
import { FMKSelect } from '@/shared/components/formik/FormikSelect'
import { Form, Formik } from 'formik'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { EmployeeRole } from '../../../auth/models/IUser'
import { useTransactionsStore } from '../../context/transactions-store'
import { useTransactionsForm } from '../../hooks/use-transactions-form'
import { IPayMethod } from '../../models/IPaymentMethod'
import { ITransaction, TransactionType, TransactionOrigin } from '../../models/ITransaction'
import FMKProbabilitySelector from './probability-selector'
import ProductServiceSelector from './product-service-selector'

export const NewEditForm = ({ currentTransaction }: { currentTransaction?: ITransaction }) => {
  const { initialValues, handleSubmit, validationSchema } = useTransactionsForm(currentTransaction)
  const { employees } = useEmployeesStore()
  const { delegations } = useDelegationsStore()
  const { user } = UseAccountStore()
  const { payMethods } = useTransactionsStore()
  const { tasks } = useTasksStore()

  return (
    <div className="flex justify-center gap-10">
      <Formik initialValues={initialValues as any} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({ values }) => {
          const filteresTasks = tasks
            .filter((task) => task.delegation.employee.id.toString() === (values as any).employeeId)
            .filter(
              (task) =>
                task.delegation.id.toString() === (values as any).delegationId && task.status === TaskStatus.PENDING,
            )
          return (
            <>
              <Card className="w-full p-8 ">
                <Form className="flex flex-col gap-6">
                  <div className="flex gap-4">
                    <div className="flex flex-1 flex-col ">
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
                      <div className="flex gap-2">
                        <div className="flex-1">
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
                        </div>
                        {values.delegationId && filteresTasks?.length > 0 && (
                          <div className="flex-1">
                            <FMKSelect
                              name="taskId"
                              label="Tarea"
                              options={filteresTasks.map((task) => ({
                                label: `${task.type === TaskType.CALL ? 'Llamada' : 'Visita'} - ${new Date(task.date).toLocaleDateString()}`,
                                value: task.id.toString(),
                              }))}
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <FMKSelect
                            name="payMethodId"
                            label="Método de pago"
                            options={payMethods.map((payMethod: IPayMethod) => ({
                              label: payMethod.name,
                              value: payMethod.id.toString(),
                            }))}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <FMKSelect
                            name="type"
                            label="Tipo"
                            options={Object.keys(TransactionType).map((key) => ({
                              label: key,
                              value: key,
                            }))}
                          />
                        </div>
                        <div className="flex-1">
                          <FMKSelect
                            name="origin"
                            label="Origen"
                            options={Object.keys(TransactionOrigin).map((key) => ({
                              label: key,
                              value: key,
                            }))}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <FMKDatePicker name="date" label="Fecha" />
                        </div>
                        <div className="flex-1">
                          <FMKDatePicker name="expiration" label="Esperar hasta:" />
                        </div>
                      </div>
                      <FMKProbabilitySelector name="successProbability" label="Probabilidad de éxito" />
                    </div>
                    <div className="max-h-full flex-1">
                      <ProductServiceSelector />
                    </div>
                  </div>
                  <Button type="submit" className="btn-primary">
                    Guardar
                  </Button>
                </Form>
              </Card>
            </>
          )
        }}
      </Formik>
    </div>
  )
}
