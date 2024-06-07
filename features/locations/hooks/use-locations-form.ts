import { usePathname, useRouter } from 'next/navigation'

import * as yup from 'yup'

import { useLocationsStore } from '../context/locations-store'
import { ILocation, ILocationCreate, ILocationUpdate, LocationType } from '../models/ILocation'

export function useLocationsForm({ currentLocation, hasParent }: { currentLocation?: ILocation; hasParent?: boolean }) {
  const { createLocation: createCategory, updateLocation: updateCategory } = useLocationsStore()
  const router = useRouter()
  const pathname = usePathname()

  const initialValues = {
    name: currentLocation?.name || '',
    isActive: currentLocation?.isActive ?? true,
    type: currentLocation?.type || LocationType.COUNTRY,
    parentId: currentLocation?.parent?.id.toString() || undefined,
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required('El nombre es requerido'),
    isActive: yup.boolean().required('El estado es requerido'),
    type: yup.string().required('El tipo es requerido'),
    parentId: yup.string(),
  })

  const handleSubmit = async (data: ILocationCreate | ILocationUpdate) => {
    const fomattedData = {
      ...data,
      parentId: hasParent === true ? Number(data.parentId) : undefined,
    }

    if (currentLocation) {
      await updateCategory(currentLocation.id, fomattedData as ILocationUpdate)
      router.push(pathname.split('/').slice(0, -2).join('/'))
      return
    }

    await createCategory(fomattedData as ILocationCreate)
    router.push(pathname.replace('/new', ''))
  }

  return { handleSubmit, validationSchema, initialValues }
}
