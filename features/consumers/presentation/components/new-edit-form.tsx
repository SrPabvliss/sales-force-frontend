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
      <Card className=" mb-16 p-8">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {() => (
            <Form className="flex  flex-col gap-6">
              <FMKInput name="person.dni" label="Cedula" />
              <div className="grid grid-cols-2 gap-5">
                <FMKInput name="person.name" label="Nombre" />
                <FMKInput name="person.secondName" label="Segundo Nombre" />
                <FMKInput name="person.lastName" label="Apellido" />
                <FMKInput name="person.secondLastName" label="Segundo Apellido" />
                <FMKInput name="person.email" label="Correo" />
                <FMKInput name="person.phone" label="Teléfono" />

                <FMKDatePicker name="person.birthdate" label="Fecha de nacimiento" />
                <FMKSelect
                  name="person.gender"
                  label="Género"
                  options={Object.values(PersonGender).map((gender) => ({
                    label: PersonGenderOptions[gender],
                    value: gender,
                  }))}
                />

                <FMKSelect
                  name="person.locationId"
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
