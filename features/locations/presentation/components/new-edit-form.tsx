import { FMKInput } from '@/shared/components/formik/FormikInput'
import { FMKSelect } from '@/shared/components/formik/FormikSelect'
import { FMKSwitch } from '@/shared/components/formik/FormikSwitch'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

import { useLocationsStore } from '../../context/locations-store'
import { useLocationsForm } from '../../hooks/use-locations-form'
import { ILocation, locationTypeOptions } from '../../models/ILocation'

export const NewEditForm = ({ currentLocation }: { currentLocation?: ILocation }) => {
  const { locations } = useLocationsStore()
  const [hasParent, setHasParent] = useState(currentLocation?.parent ?? false)
  const { initialValues, handleSubmit, validationSchema } = useLocationsForm({
    currentLocation,
    hasParent: !!hasParent,
  })

  return (
    <div className="flex justify-center gap-10">
      <Card className="w-1/2 p-8">
        <Formik initialValues={initialValues as any} onSubmit={handleSubmit} validationSchema={validationSchema}>
          {() => (
            <Form className="flex  flex-col gap-6">
              <FMKInput name="name" label="Nombre" />
              <div className="flex gap-4">
                <FMKSelect name="type" label="Tipo" options={locationTypeOptions} />
                {hasParent && (
                  <FMKSelect
                    name="parentId"
                    label="Pertence a "
                    options={locations
                      .map((location) => ({ label: location.name, value: location.id.toString() }))
                      .filter((option) => option.value !== currentLocation?.id.toString())}
                  />
                )}
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  onCheckedChange={(value) => setHasParent(!!value)}
                  defaultChecked={!!currentLocation?.parent}
                />
                <Label className="text-sm">¿Pertenece a?</Label>
              </div>
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
