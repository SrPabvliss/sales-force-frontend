import { FMKInput } from '@/shared/components/formik/FormikInput'
import { FMKSwitch } from '@/shared/components/formik/FormikSwitch'
import { Form, Formik } from 'formik'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { useLocationsForm } from '../../hooks/use-locations-form'
import { ILocation } from '../../models/ILocation'

export const NewEditForm = ({ currentLocation }: { currentLocation?: ILocation }) => {
  const { initialValues, handleSubmit, validationSchema } = useLocationsForm({
    currentLocation,
  })

  return (
    <div className="flex justify-center gap-10">
      <Card className="w-1/2 p-8">
        <Formik initialValues={initialValues as any} onSubmit={handleSubmit} validationSchema={validationSchema}>
          {() => (
            <Form className="flex  flex-col gap-6">
              <FMKInput name="name" label="Nombre" />
              <FMKSwitch name="isActive" label="Ubicación activa" />
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
