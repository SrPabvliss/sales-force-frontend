import { useBrandsStore } from '@/features/brands/context/brands-store'
import { useCategoriesStore } from '@/features/categories/context/categories-store'
import { FMKInput } from '@/shared/components/formik/FormikInput'
import { FMKSelect } from '@/shared/components/formik/FormikSelect'
import { FMKSwitch } from '@/shared/components/formik/FormikSwitch'
import { FMKTextarea } from '@/shared/components/formik/FormikTextArea'
import { Form, Formik } from 'formik'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

import { useProductForm } from '../../hooks/use-products-form'
import { IProduct } from '../../models/IProduct'

export const NewEditForm = ({ currentProduct }: { currentProduct?: IProduct }) => {
  const { initialValues, handleSubmit, validationSchema } = useProductForm(currentProduct)
  const { categories } = useCategoriesStore()
  const { brands } = useBrandsStore()
  return (
    <div className="flex justify-start gap-10">
      <Card className="w-1/2 p-8">
        <Formik initialValues={initialValues as any} onSubmit={handleSubmit} validationSchema={validationSchema}>
          {() => (
            <Form className="flex  flex-col gap-6">
              <FMKInput name="name" label="Nombre" />
              <div className="flex gap-4">
                <div className="flex-1">
                  <FMKSelect
                    name="categoryId"
                    label="Categoría"
                    options={categories.map((category) => ({ label: category.name, value: category.id.toString() }))}
                  />
                </div>
                <div className="flex-1">
                  <FMKSelect
                    name="brandId"
                    label="Marca"
                    className="flex-1"
                    options={brands.map((brand) => ({ label: brand.name, value: brand.id.toString() }))}
                  />
                </div>
              </div>
              <FMKInput name="price" label="Precio" type="number" />
              <FMKInput name="stock" label="Stock" type="number" />
              <FMKTextarea name="description" label="Descripción" />
              <FMKSwitch name="isActive" label="Producto activo" />
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
