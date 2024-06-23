import { useConsumersStore } from '@/features/consumers/context/consumers-store'
import { useEmployeesStore } from '@/features/employees/context/employees-store'
import { useLocationsStore } from '@/features/locations/context/locations-store'
import { FMKDatePicker } from '@/shared/components/formik/FormikDatePicker'
import { FMKInput } from '@/shared/components/formik/FormikInput'
import { FMKSelect } from '@/shared/components/formik/FormikSelect'
import { Form, Formik } from 'formik'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { useChancesForm } from '../../hooks/use-chances-form'
import { IChance } from '../../models/IChance'

export const NewEditForm = ({ currentChance }: { currentChance?: IChance }) => {
  const { initialValues, handleSubmit, validationSchema } = useChancesForm(currentChance)
  const { employees } = useEmployeesStore()
  const { consumers } = useConsumersStore()
  const { locations } = useLocationsStore()

  return (
    <div className="flex justify-center gap-10">
      <Formik initialValues={initialValues as any} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({ values }) => (
          <>
            <Card className="w-1/3 p-8">
              <Form className="flex flex-col gap-6">
                <FMKSelect
                  name="employeeId"
                  label="Empleado"
                  options={employees.map((employee) => ({
                    label: `${employee.person.name} ${employee.person.lastName} - ${employee.person.dni}`,
                    value: employee.id.toString(),
                  }))}
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
                <FMKInput name="amount" label="Monto" type="number" />
                <FMKDatePicker name="date" label="Fecha" />
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
