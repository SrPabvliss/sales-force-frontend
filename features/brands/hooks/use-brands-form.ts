import { usePathname, useRouter } from 'next/navigation'

import * as yup from 'yup'

import { useBrandsStore } from '../context/brands-store'
import { IBrand } from '../models/IBrands'

export function useBrandsForm(currentBrand?: IBrand) {
  const { createBrand, updateBrand } = useBrandsStore()
  const router = useRouter()
  const pathname = usePathname()

  const initialValues: Omit<IBrand, 'id'> = {
    name: currentBrand?.name || '',
    isActive: currentBrand?.isActive || true,
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
    if (currentBrand) {
      await updateBrand(currentBrand.id, data)
      router.push(pathname.split('/').slice(0, -2).join('/'))
      return
    }
    await createBrand(data)
    router.push(pathname.replace('/new', ''))
  }

  return { handleSubmit, validationSchema, initialValues }
}
