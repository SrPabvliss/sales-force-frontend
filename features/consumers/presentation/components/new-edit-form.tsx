import { FMKInput } from '@/shared/components/formik/FormikInput'
import { FMKSelect } from '@/shared/components/formik/FormikSelect'
import { FMKSwitch } from '@/shared/components/formik/FormikSwitch'
import { Form, Formik } from 'formik'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { PersonGender, PersonGenderOptions } from '../../../../shared/interfaces/IPerson'
import { useConsumersForm } from '../../hooks/use-consumers-form'
import { IConsumer } from '../../models/IConsumer'

export const NewEditForm = ({ currentConsumer }: { currentConsumer?: IConsumer }) => {
  const { initialValues, handleSubmit, validationSchema } = useConsumersForm(currentConsumer)

  console.log(currentConsumer)

  return (
    <div className="flex justify-start gap-10">
      <Card className="w-1/2 p-8">
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
          {() => (
            <Form className="flex  flex-col gap-6">
              <FMKInput name="person.dni" label="Cedula" />
              <FMKInput name="person.name" label="Nombre" />
              <FMKInput name="person.secondName" label="Segundo Nombre" />
              <FMKInput name="person.lastName" label="Apellido" />
              <FMKInput name="person.secondLastName" label="Segundo Apellido" />
              <FMKInput name="person.email" label="Correo" />
              <FMKInput name="person.phone" label="Teléfono" />
              <FMKInput name="person.birthdate" label="Fecha de nacimiento" />
              <FMKSelect
                name="person.gender"
                label="Género"
                options={Object.values(PersonGender).map((gender) => ({
                  label: PersonGenderOptions[gender],
                  value: gender,
                }))}
              />

              <FMKSelect
                name="person.location"
                label="Ubicación"
                options={Object.values(PersonGender).map((gender) => ({
                  label: PersonGenderOptions[gender],
                  value: gender,
                }))}
              />

              <FMKSwitch name="isActive" label="Consumidor activo" />

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
