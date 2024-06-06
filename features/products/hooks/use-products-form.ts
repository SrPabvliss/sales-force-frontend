import { usePathname, useRouter } from 'next/navigation'

import * as yup from 'yup'

import { useProductsStore } from '../context/products-store'
import { IProduct, IProductCreate, IProductUpdate } from '../models/IProduct'

export function useProductForm(currentProduct?: IProduct) {
  const { createProduct: createCategory, updateProduct: updateCategory } = useProductsStore()
  const router = useRouter()
  const pathname = usePathname()

  const initialValues = {
    name: currentProduct?.name || '',
    description: currentProduct?.description || '',
    isActive: currentProduct?.isActive ?? true,
    price: currentProduct?.price || undefined,
    stock: currentProduct?.stock || undefined,
    brandId: currentProduct?.brand.id.toString() || undefined,
    categoryId: currentProduct?.category.id.toString() || undefined,
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required('El nombre es requerido'),
    description: yup.string(),
    isActive: yup.boolean().required('El estado es requerido'),
    price: yup.number().required('El precio es requerido'),
    stock: yup.number().integer('El stock debe ser un número entero').required('El stock es requerido'),
    brandId: yup.string().required('La marca es requerida'),
    categoryId: yup.string().required('La categoría es requerida'),
  })

  const handleSubmit = async (data: IProductCreate | IProductUpdate) => {
    const formattedData = {
      ...data,
      brandId: Number(data.brandId),
      categoryId: Number(data.categoryId),
    }

    if (currentProduct) {
      await updateCategory(currentProduct.id, formattedData as IProductUpdate)
      router.push(pathname.split('/').slice(0, -2).join('/'))
      return
    }

    await createCategory(formattedData as IProductCreate)
    router.push(pathname.replace('/new', ''))
  }

  return { handleSubmit, validationSchema, initialValues }
}
