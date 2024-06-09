import { useLocationsStore } from '@/features/locations/context/locations-store'
import { FMKInput } from '@/shared/components/formik/FormikInput'
import { FMKSelect } from '@/shared/components/formik/FormikSelect'
import { FMKSwitch } from '@/shared/components/formik/FormikSwitch'
import { Form, Formik } from 'formik'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { FMKDatePicker } from '../../../../shared/components/formik/FormikDatePicker'
import { PersonGender, PersonGenderOptions } from '../../../../shared/interfaces/IPerson'
import { useConsumersForm } from '../../hooks/use-consumers-form'
import { ConsumerType, ConsumerTypeOptions, IConsumer } from '../../models/IConsumer'

export const NewEditForm = ({ currentConsumer }: { currentConsumer?: IConsumer }) => {
  const { initialValues, handleSubmit, validationSchema } = useConsumersForm(currentConsumer)
  const { locations } = useLocationsStore()

  return (
    <div className="flex justify-center gap-10">
      <Card className=" p-8">
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
          {() => (
            <Form className="flex  flex-col gap-6">
              <FMKInput name="dni" label="Cedula" />
              <div className="grid grid-cols-2 gap-5">
                <FMKInput name="name" label="Nombre" />
                <FMKInput name="secondName" label="Segundo Nombre" />
                <FMKInput name="lastName" label="Apellido" />
                <FMKInput name="secondLastName" label="Segundo Apellido" />
                <FMKInput name="email" label="Correo" />
                <FMKInput name="phone" label="Teléfono" />

                <FMKDatePicker name="birthdate" label="Fecha de nacimiento" />
                <FMKSelect
                  name="gender"
                  label="Género"
                  options={Object.values(PersonGender).map((gender) => ({
                    label: PersonGenderOptions[gender],
                    value: gender,
                  }))}
                />

                <FMKSelect
                  name="locationId"
                  label="Ubicación"
                  options={locations.map((location) => ({
                    label: location.name,
                    value: location.id.toString(),
                  }))}
                />

                <FMKSelect
                  name="type"
                  label="Tipo de consumidor"
                  options={Object.values(ConsumerType).map((type) => ({
                    label: ConsumerTypeOptions[type],
                    value: type,
                  }))}
                />
              </div>

              <FMKSwitch name="isActive" label="Consumidor activo" />
              <FMKSwitch name="isCustomer" label="Es cliente" />

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
