'use client'
import { FMKCheckbox } from '@/shared/components/FormikCheckbox'
import { FMKInput } from '@/shared/components/FormikInput'
import { FMKSelect } from '@/shared/components/FormikSelect'
import { Form, Formik } from 'formik'

import { SelectItem } from '@/components/ui/select'

import { useAuth } from '../../hooks/useAuth'

export const AuthForm = () => {
  const { handleSubmit, initialValues, validationSchema } = useAuth()
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {() => (
        <Form>
          <FMKInput name="email" label="Email" type="email" />
          <FMKInput name="password" label="Password" type="password" />
          <FMKSelect name="role" label="Role">
            <SelectItem value={'1'}>Apple</SelectItem>
            <SelectItem value={'2'}>Banana</SelectItem>
            <SelectItem value={'3'}>Blueberry</SelectItem>
            <SelectItem value={'4'}>Grapes</SelectItem>
            <SelectItem value={'5'}>Pineapple</SelectItem>
          </FMKSelect>
          <FMKCheckbox name="remember" label="Remember me" />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  )
}
