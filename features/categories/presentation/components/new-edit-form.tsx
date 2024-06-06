import { FMKInput } from '@/shared/components/formik/FormikInput'
import { FMKSwitch } from '@/shared/components/formik/FormikSwitch'
import { Form, Formik } from 'formik'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { useCategoriesForm } from '../../hooks/use-categories-form'
import { ICategory } from '../../models/ICategory'

export const NewEditForm = ({ currentBrand }: { currentBrand?: ICategory }) => {
  const { initialValues, handleSubmit, validationSchema } = useCategoriesForm(currentBrand)
  return (
    <div className="flex justify-start gap-10">
      <Card className="w-1/2 p-8">
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
          {() => (
            <Form className="flex  flex-col gap-6">
              <FMKInput name="name" label="Nombre" />
              <FMKSwitch name="isActive" label="Marca activa" />
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
