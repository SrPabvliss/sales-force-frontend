import { employeeTypeOptions } from '@/features/auth/models/IUser'
import { useLocationsStore } from '@/features/locations/context/locations-store'
import { FMKInput } from '@/shared/components/formik/FormikInput'
import { FMKSelect } from '@/shared/components/formik/FormikSelect'
import { FMKSwitch } from '@/shared/components/formik/FormikSwitch'
import { Form, Formik } from 'formik'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { FMKDatePicker } from '../../../../shared/components/formik/FormikDatePicker'
import { PersonGender, PersonGenderOptions } from '../../../../shared/interfaces/IPerson'
import { useEmployeesForm } from '../../hooks/use-employees-forms'
import { IEmployee } from '../../models/IEmployee'

export const NewEditForm = ({ currentEmployee }: { currentEmployee?: IEmployee }) => {
  const { initialValues, handleSubmit, validationSchema } = useEmployeesForm(currentEmployee)
  const { locations } = useLocationsStore()

  return (
    <div className="flex justify-center gap-10">
      <Card className=" mb-16 p-8">
        <Formik initialValues={initialValues as any} onSubmit={handleSubmit} validationSchema={validationSchema}>
          {() => (
            <Form className="flex  flex-col gap-6">
              <FMKInput name="person.dni" label="Cedula" />
              <div className="grid grid-cols-2 gap-5">
                <FMKInput name="username" label="Usuario" />
                <FMKInput name="password" label="Contraseña" />
                <FMKInput name="person.name" label="Nombre" />
                <FMKInput name="person.secondName" label="Segundo Nombre" />
                <FMKInput name="person.lastName" label="Apellido" />
                <FMKInput name="person.secondLastName" label="Segundo Apellido" />
                <FMKInput name="person.email" label="Correo" />
                <FMKInput name="person.phone" label="Teléfono" />

                <FMKDatePicker name="person.birthdate" label="Fecha de nacimiento" />

                <FMKSelect
                  name="person.gender"
                  label="Género"
                  options={Object.values(PersonGender).map((gender) => ({
                    label: PersonGenderOptions[gender],
                    value: gender,
                  }))}
                />

                <FMKSelect
                  name="person.locationId"
                  label="Ubicación"
                  options={locations.map((location) => ({
                    label: location.name,
                    value: location.id.toString(),
                  }))}
                />

                <FMKSelect name="role" label="Rol" options={employeeTypeOptions} />
              </div>

              <FMKSwitch name="isActive" label="Empleado activo" />

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
