import { FMKInput } from '@/shared/components/formik/FormikInput'
import { FMKSwitch } from '@/shared/components/formik/FormikSwitch'
import { FMKTextarea } from '@/shared/components/formik/FormikTextArea'
import { Form, Formik } from 'formik'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { useServiceForm } from '../../hooks/use-products-form'
import { IService } from '../../models/IService'

export const NewEditForm = ({ currentService }: { currentService?: IService }) => {
  const { initialValues, handleSubmit, validationSchema } = useServiceForm(currentService)
  return (
    <div className="flex justify-center gap-10">
      <Card className="w-1/2 p-8">
        <Formik
          initialValues={initialValues as any}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {() => (
            <Form className="flex  flex-col gap-6">
              <FMKInput name="name" label="Nombre" />
              <FMKInput name="pricePerHour" label="Precio por hora" type="number" />
              <FMKTextarea name="description" label="Descripción" />
              <FMKSwitch name="isActive" label="Servicio activo" />
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
