import { usePathname, useRouter } from 'next/navigation'

import * as yup from 'yup'

import { useLocationsStore } from '../context/locations-store'
import { ILocation, ICreateLocation, IUpdateLocation } from '../models/ILocation'

export function useLocationsForm({ currentLocation }: { currentLocation?: ILocation }) {
  const { createLocation, updateLocation } = useLocationsStore()
  const router = useRouter()
  const pathname = usePathname()

  const initialValues = {
    name: currentLocation?.name || '',
    isActive: currentLocation?.isActive ?? true,
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required('El nombre es requerido'),
    isActive: yup.boolean().required('El estado es requerido'),
  })

  const handleSubmit = async (data: ICreateLocation | IUpdateLocation) => {
    if (currentLocation) {
      await updateLocation(currentLocation.id, data as IUpdateLocation)
      router.push(pathname.split('/').slice(0, -2).join('/'))
      return
    }

    await createLocation(data as ICreateLocation)
    router.push(pathname.replace('/new', ''))
  }

  return { handleSubmit, validationSchema, initialValues }
}
