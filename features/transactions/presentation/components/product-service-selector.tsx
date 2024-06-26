import { useProductsStore } from '@/features/products/context/products-store'
import { useServicesStore } from '@/features/services-feature/context/services-store'
import { FMKInput } from '@/shared/components/formik/FormikInput'
import { FMKSelect } from '@/shared/components/formik/FormikSelect'
import { FieldArray, useFormikContext } from 'formik'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

const ProductServiceSelector = () => {
  const { values, setFieldValue } = useFormikContext()
  const { products } = useProductsStore()
  const { services } = useServicesStore()

  const addItem = (type: string) => {
    const item =
      type === 'product'
        ? { productId: '', serviceId: null, quantity: 1 }
        : { productId: null, serviceId: '', quantity: 1 }
    setFieldValue('items', [...(values as any).items, item])
  }

  const removeItem = (index: number) => {
    const newItems = (values as any).items.filter((_: any, i: number) => i !== index)
    setFieldValue('items', newItems)
  }

  return (
    <Card className="max-h-full flex-1 overflow-y-visible p-4">
      <h3 className="text-lg font-bold">Items</h3>
      <FieldArray name="items">
        {() => (
          <ScrollArea className="h-96 w-full rounded-md border">
            {(values as any).items.map((item: any, index: number) => {
              return (
                <div key={index} className="mb-4 flex items-center gap-4 border-b p-4">
                  <FMKSelect
                    name={`items[${index}].${item.productId != null ? 'productId' : 'serviceId'}`}
                    value={item.productId !== null || item.serviceId || ''}
                    onChange={(e) => {
                      const fieldName =
                        item.productId != null ? `items[${index}].productId` : `items[${index}].serviceId`
                      setFieldValue(fieldName, e.target.value)
                    }}
                    label="Producto/Servicio"
                    options={
                      item.productId != null
                        ? products.map((product) => ({
                            label: product.name,
                            value: product.id.toString(),
                          }))
                        : services.map((service) => ({
                            label: service.name,
                            value: service.id.toString(),
                          }))
                    }
                  />
                  <FMKInput
                    type="number"
                    label={item.productId != null ? 'Cantidad' : 'Horas'}
                    name={`items[${index}].quantity`}
                    value={Number(item.quantity) || undefined}
                    onChange={(e) => setFieldValue(`items[${index}].quantity`, Number(e.target.value))}
                  />
                  <Button type="button" onClick={() => removeItem(index)} className="mt-5">
                    -
                  </Button>
                </div>
              )
            })}
            <div className="flex gap-2 p-4">
              <Button type="button" onClick={() => addItem('product')}>
                + Producto
              </Button>
              <Button type="button" onClick={() => addItem('service')}>
                + Servicio
              </Button>
            </div>
          </ScrollArea>
        )}
      </FieldArray>
    </Card>
  )
}

export default ProductServiceSelector
