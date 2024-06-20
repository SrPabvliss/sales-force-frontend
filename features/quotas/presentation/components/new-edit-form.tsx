import { useEmployeesStore } from '@/features/users/context/employees-store'
import { FMKInput } from '@/shared/components/formik/FormikInput'
import { FMKSelect } from '@/shared/components/formik/FormikSelect'
import { FMKSwitch } from '@/shared/components/formik/FormikSwitch'
import { Form, Formik } from 'formik'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { FMKDatePicker } from '../../../../shared/components/formik/FormikDatePicker'
import { useQuotasForm } from '../../hooks/use-quotas-form'
import { IQuota } from '../../models/IQuota'

export const NewEditForm = ({ currentQuota }: { currentQuota?: IQuota }) => {
  const { initialValues, handleSubmit, validationSchema } = useQuotasForm({ currentQuota })
  const { employees } = useEmployeesStore()

  return (
    <div className="flex justify-center gap-10">
      <Card className=" p-8">
        <Formik initialValues={initialValues as any} onSubmit={handleSubmit} validationSchema={validationSchema}>
          {() => (
            <Form className="flex  flex-col gap-6">
              <div className="w-full">
                <FMKSelect
                  name="employeeId"
                  label="Empleado"
                  options={employees.map((employee) => ({
                    label: `${employee.person.name} ${employee.person.lastName}`,
                    value: employee.id.toString(),
                  }))}
                />
              </div>
              <div className="flex gap-4">
                <FMKInput name="goal" label="Valor de meta" type="number" />
                <FMKInput name="commission" label="Comisión porcentual" type="number" />
              </div>

              <div className="flex w-full gap-4">
                <div className="flex-1">
                  <FMKDatePicker name="startDate" label="Fecha de inicio" />
                </div>
                <div className="flex-1">
                  <FMKDatePicker name="endDate" label="Fecha de fin" />
                </div>
              </div>

              <FMKSwitch name="isActive" label="Cuota Activa" />
              <FMKSwitch name="isAchieved" label="Completada" />

              <Button type="submit" className="btn-primary">
                Guardar
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  )
}
