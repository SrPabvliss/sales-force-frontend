import { usePathname, useRouter } from 'next/navigation'

import * as yup from 'yup'

import { useServicesStore } from '../context/services-store'
import { ICreateService, IService, IUpdateService } from '../models/IService'

export function useServiceForm(currentService?: IService) {
  const { createService, updateService } = useServicesStore()
  const router = useRouter()
  const pathname = usePathname()

  const initialValues = {
    name: currentService?.name || '',
    description: currentService?.description || '',
    isActive: currentService?.isActive ?? true,
    pricePerHour: currentService?.pricePerHour || 0,
    isAvailable: currentService?.isAvailable || true,
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required('El nombre es requerido'),
    description: yup.string(),
    isActive: yup.boolean().required('El estado es requerido'),
    pricePerHour: yup.number().required('El precio por hora es requerido'),
    isAvailable: yup.boolean(),
  })

  const handleSubmit = async (data: ICreateService | IUpdateService) => {
    if (currentService) {
      await updateService(currentService.id, data as IUpdateService)
      router.push(pathname.split('/').slice(0, -2).join('/'))
      return
    }

    await createService(data as ICreateService)
    router.push(pathname.replace('/new', ''))
  }

  return { handleSubmit, validationSchema, initialValues }
}
