import { FMKInput } from '@/shared/components/formik/FormikInput'
import { FMKSwitch } from '@/shared/components/formik/FormikSwitch'
import { Form, Formik } from 'formik'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { useCategoriesForm } from '../../hooks/use-categories-form'
import { IConsumer } from '../../models/IConsumer'

export const NewEditForm = ({ currentConsumer }: { currentConsumer?: IConsumer }) => {
  const { initialValues, handleSubmit, validationSchema } = useCategoriesForm(currentConsumer)
  console.log(currentConsumer)

  return (
    <div className="flex justify-start gap-10">
      <Card className="w-1/2 p-8">
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
          {() => (
            <Form className="flex  flex-col gap-6">
              <FMKInput name="name" label="Nombre" />
              {/* <FMKSwitch name="isActive" label="Categoría activa" />
              <FMKInput name="" label="Cedula" />
              <FMKInput name="" label="Nombre" />
              <FMKInput name="" label="Segundo Nombre" />
              <FMKInput name="" label="Apellido" />
              <FMKInput name="" label="Segundo Apellido" />
              <FMKInput name="" label="Correo" />
              <FMKInput name="" label="Teléfono" /> */}

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
