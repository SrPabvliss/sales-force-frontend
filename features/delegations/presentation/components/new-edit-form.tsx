import { UseAccountStore } from '@/features/auth/context/useUserStore'
import { EmployeeRole } from '@/features/auth/models/IUser'
import { useConsumersStore } from '@/features/consumers/context/consumers-store'
import { useEmployeesStore } from '@/features/employees/context/employees-store'
import { useLocationsStore } from '@/features/locations/context/locations-store'
import { FMKSelect } from '@/shared/components/formik/FormikSelect'
import { FMKSwitch } from '@/shared/components/formik/FormikSwitch'
import { Form, Formik } from 'formik'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { useDelegationsStore } from '../../context/delegations-store'
import { useDelegationForm } from '../../hooks/use-delegations-form'
import { IDelegation } from '../../models/IDelegation'
import { DelegationsTable } from './DataTable/delegations-table'

export const NewEditForm = ({ currentDelegation }: { currentDelegation?: IDelegation }) => {
  const { initialValues, handleSubmit, validationSchema } = useDelegationForm(currentDelegation)
  const { employees } = useEmployeesStore()
  const { consumers } = useConsumersStore()
  const { locations } = useLocationsStore()
  const { getAllDelegationsByEmployee } = useDelegationsStore()
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
            <Card className="w-1/3 p-8">
              <Form className="flex flex-col gap-6">
                <FMKSelect
                  name="employeeId"
                  label="Empleado"
                  options={
                    user?.role === EmployeeRole.SELLER
                      ? employees
                          .filter((employee) => employee.id === user.id)
                          .map((employee) => ({
                            label: `${employee.person.name} ${employee.person.lastName} - ${employee.person.dni}`,
                            value: employee.id.toString(),
                          }))
                      : employees.map((employee) => ({
                          label: `${employee.person.name} ${employee.person.lastName} - ${employee.person.dni}`,
                          value: employee.id.toString(),
                        }))
                  }
                />
                <FMKSelect
                  name="locationId"
                  label="Ubicación"
                  options={locations.map((location) => ({
                    label: location.name,
                    value: location.id.toString(),
                  }))}
                />
                <FMKSelect
                  name="consumerId"
                  label="Consumidor"
                  options={consumers
                    .filter((consumer) => consumer.person.location.id === Number((values as any).locationId))
                    .map((consumer) => ({
                      label: `${consumer.person.name} ${consumer.person.lastName} - ${consumer.person.dni}	`,
                      value: consumer.id.toString(),
                    }))}
                />
                <FMKSwitch name="isActive" label="Delegación activa" />
                <Button type="submit" className="btn-primary">
                  Guardar
                </Button>
              </Form>
            </Card>
            {values.employeeId &&
              (() => {
                const delegations = getAllDelegationsByEmployee(Number(values.employeeId))

                return (
                  <Card className="w-4/6 p-8">
                    <DelegationsTable data={delegations} />
                  </Card>
                )
              })()}
          </>
        )}
      </Formik>
    </div>
  )
}
