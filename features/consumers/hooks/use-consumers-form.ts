import { usePathname, useRouter } from 'next/navigation'

// import { LocationType } from '@/features/locations/models/ILocation'

import * as yup from 'yup'

import { useConsumersStore } from '../context/consumers-store'
import { ConsumerType, IConsumer, ICreateConsumer, IUpdateConsumer } from '../models/IConsumer'

export function useConsumersForm(currentConsumer?: IConsumer) {
  const { createConsumer, updateConsumer } = useConsumersStore()
  const router = useRouter()
  const pathname = usePathname()

  const initialValues = {
    name: currentConsumer?.person?.name || '',
    secondName: currentConsumer?.person?.secondName || '',
    lastName: currentConsumer?.person?.lastName || '',
    secondLastName: currentConsumer?.person?.secondLastName || '',
    email: currentConsumer?.person?.email || '',
    phone: currentConsumer?.person?.phone || '',
    dni: currentConsumer?.person?.dni || '',
    gender: currentConsumer?.person?.gender || '',
    birthdate: currentConsumer?.person?.birthdate || null,
    locationId: currentConsumer?.person?.location.id.toString() || '',
    isActive: currentConsumer?.isActive ?? true,
    isCustomer: currentConsumer?.isCustomer ?? false,
    type: currentConsumer?.type || ConsumerType.NATURAL,
  }

  const validationSchema = yup.object().shape({
    isActive: yup.boolean().required('El estado es requerido'),
    isCustomer: yup.boolean().required('El tipo de cliente es requerido'),
    type: yup.string().required('El tipo de consumidor es requerido'),
  })

  const handleSubmit = async (data: any) => {
    const {
      name,
      dni,
      secondName,
      lastName,
      secondLastName,
      gender,
      email,
      phone,
      birthdate,
      locationId,
      isActive,
      isCustomer,
      type,
    } = data
    console.log(data)

    const personData = {
      dni,
      name,
      secondName,
      lastName,
      secondLastName,
      gender,
      email: email || null,
      phone: phone ? phone.toString() : null,
      birthdate,
      locationId: Number(locationId),
    }

    const consumerData = {
      type,
      isCustomer,
      isActive,
      person: personData,
    }
    if (currentConsumer) {
      await updateConsumer(currentConsumer.id, consumerData as IUpdateConsumer)
      router.push(pathname.split('/').slice(0, -2).join('/'))
      return
    }
    await createConsumer(consumerData as ICreateConsumer)
    router.push(pathname.replace('/new', ''))
  }

  return { handleSubmit, validationSchema, initialValues }
}
