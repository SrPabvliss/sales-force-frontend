'use client'
import { Form, Formik } from 'formik'
import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { FMKInput } from '@/shared/components/FormikInput'

export const AuthForm = () => {
  const { handleSubmit, initialValues, validationSchema } = useAuth()
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {() => (
        <Form>
          <FMKInput name="email" label="Email" type="email" />
          <FMKInput name="password" label="Password" type="password" />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )
}
