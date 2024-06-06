import { usePathname, useRouter } from 'next/navigation'

import * as yup from 'yup'

import { useCategoriesStore } from '../context/categories-store'
import { ICategory } from '../models/ICategory'

export function useCategoriesForm(currentCategory?: ICategory) {
  const { createCategory, updateCategory } = useCategoriesStore()
  const router = useRouter()
  const pathname = usePathname()

  const initialValues: Omit<ICategory, 'id'> = {
    name: currentCategory?.name || '',
    isActive: currentCategory?.isActive || true,
  }

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required('El nombre es requerido')
      .min(3, 'El nombre debe tener al menos 3 caracteres')
      .max(50, 'El nombre debe tener como máximo 50 caracteres'),
    isActive: yup.boolean().required('El estado es requerido'),
  })

  const handleSubmit = async (data: any) => {
    if (currentCategory) {
      await updateCategory(currentCategory.id, data)
      router.push(pathname.split('/').slice(0, -2).join('/'))
      return
    }
    await createCategory(data)
    router.push(pathname.replace('/new', ''))
  }

  return { handleSubmit, validationSchema, initialValues }
}
