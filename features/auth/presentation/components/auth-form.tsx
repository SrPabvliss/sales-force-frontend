'use client'
import { FMKInput } from '@/shared/components/formik/FormikInput'
import { Form, Formik } from 'formik'

import { Button } from '@/components/ui/button'

import { useAuth } from '../../hooks/useAuth'

export const AuthForm = () => {
  const { handleSubmit, initialValues, validationSchema } = useAuth()
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {() => (
        <Form className="mt-4 space-y-6">
          <FMKInput name="username" label="Usuario" />
          <FMKInput name="password" label="Contraseña" type="password" />

          <Button type="submit" className="w-full  text-white ">
            Iniciar sesión
          </Button>
        </Form>
      )}
    </Formik>
  )
}
