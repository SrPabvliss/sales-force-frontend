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
        <Form>
          <FMKInput name="username" label="Usuario" />
          <FMKInput name="password" label="Password" />

          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  )
}
