'use client'
import { FMKCheckbox } from '@/shared/components/FormikCheckbox'
import { FMKDatePicker } from '@/shared/components/FormikDatePicker'
import { FMKInput } from '@/shared/components/FormikInput'
import { FMKSelect } from '@/shared/components/FormikSelect'
import { FMKTextarea } from '@/shared/components/FormikTextArea'
import { Form, Formik } from 'formik'

import { Button } from '@/components/ui/button'
import { SelectItem } from '@/components/ui/select'

import { useAuth } from '../../hooks/useAuth'

export const AuthForm = () => {
  const { handleSubmit, initialValues, validationSchema } = useAuth()
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {() => (
        <Form>
          <FMKInput name="email" label="Email" type="email" />
          <FMKTextarea name="password" label="Password" />
          <FMKSelect name="role" label="Role">
            <SelectItem value={'1'}>Apple</SelectItem>
            <SelectItem value={'2'}>Banana</SelectItem>
            <SelectItem value={'3'}>Blueberry</SelectItem>
            <SelectItem value={'4'}>Grapes</SelectItem>
            <SelectItem value={'5'}>Pineapple</SelectItem>
          </FMKSelect>
          <FMKCheckbox name="remember" label="Remember me" />
          <FMKDatePicker
            name="date"
            label="Fecha de cita"
            minDate={new Date()}
            maxDate={new Date(new Date().setDate(new Date().getDate() + 30))}
          />
          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  )
}
