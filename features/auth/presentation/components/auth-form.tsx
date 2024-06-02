'use client'
import { FMKCheckbox } from '@/shared/components/FormikCheckbox'
import { FMKDatePicker } from '@/shared/components/FormikDatePicker'
import { FMKDateRangePicker } from '@/shared/components/FormikDateRangePicker'
import { FMKInput } from '@/shared/components/FormikInput'
import { FMKRadioGroup } from '@/shared/components/FormikRadioGroup'
import { FMKSelect } from '@/shared/components/FormikSelect'
import { FMKTextarea } from '@/shared/components/FormikTextArea'
import { Form, Formik } from 'formik'

import { Button } from '@/components/ui/button'

import { useAuth } from '../../hooks/useAuth'

export const AuthForm = () => {
  const { handleSubmit, initialValues, validationSchema } = useAuth()
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {() => (
        <Form>
          <FMKInput name="email" label="Email" type="email" />
          <FMKTextarea name="password" label="Password" />
          <FMKSelect
            name="role"
            label="Role"
            options={[
              { label: 'Apple', value: '1' },
              { label: 'Banana', value: '2' },
              { label: 'Blueberry', value: '3' },
              { label: 'Grapes', value: '4' },
              { label: 'Pineapple', value: '5' },
            ]}
          />
          <FMKCheckbox name="remember" label="Remember me" />
          <FMKDatePicker
            name="date"
            label="Fecha de cita"
            minDate={new Date()}
            maxDate={new Date(new Date().setDate(new Date().getDate() + 30))}
          />
          <FMKDateRangePicker name="dateRange" label="Date" />
          <FMKRadioGroup
            name="radio"
            label="Radio"
            options={[
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
              { label: 'Option 3', value: '3' },
            ]}
          />

          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  )
}
