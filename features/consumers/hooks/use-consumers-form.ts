import { usePathname, useRouter } from 'next/navigation'

import * as yup from 'yup'

import { useConsumersStore } from '../context/consumers-store'
import { ConsumerType, IConsumer, ICreateConsumer, IUpdateConsumer } from '../models/IConsumer'

export function useConsumersForm(currentConsumer?: IConsumer) {
  const { createConsumer, updateConsumer } = useConsumersStore()
  const router = useRouter()
  const pathname = usePathname()

  const initialValues = {
    type: currentConsumer?.type || ConsumerType.NATURAL,
    isCustomer: currentConsumer?.isCustomer ?? false,
    isActive: currentConsumer?.isActive ?? true,
    person: {
      dni: currentConsumer?.person.dni || '',
      name: currentConsumer?.person.name || '',
      secondName: currentConsumer?.person.secondName || '',
      lastName: currentConsumer?.person.lastName || '',
      secondLastName: currentConsumer?.person.secondLastName || '',
      gender: currentConsumer?.person.gender || '',
      email: currentConsumer?.person.email || '',
      phone: currentConsumer?.person.phone || '',
      birthdate: currentConsumer?.person.birthdate || new Date(),
      locationId: currentConsumer?.person.location.id.toString() || '',
    },
  }

  const validationSchema = yup.object().shape({
    isActive: yup.boolean().required('El estado es requerido'),
    isCustomer: yup.boolean().required('El tipo de cliente es requerido'),
    type: yup.string().required('El tipo de consumidor es requerido'),
    person: yup.object().shape({
      dni: yup.string().required('La cédula es requerida'),
      name: yup.string().required('El nombre es requerido'),
      secondName: yup.string(),
      lastName: yup.string().required('El apellido es requerido'),
      secondLastName: yup.string(),
      gender: yup.string().required('El género es requerido'),
      email: yup.string().email('El correo no es válido').required('El correo es requerido'),
      phone: yup.string(),
      birthdate: yup.date(),
      locationId: yup.string().required('La ubicación es requerida'),
    }),
  })

  const handleSubmit = async (data: any) => {
    const formattedData = {
      ...data,
      person: {
        ...data.person,
        locationId: Number(data.person?.locationId),
      },
    }

    if (currentConsumer) {
      await updateConsumer(currentConsumer.id, formattedData as IUpdateConsumer)
      router.push(pathname.split('/').slice(0, -2).join('/'))
      return
    }
    await createConsumer(formattedData as ICreateConsumer)
    router.push(pathname.replace('/new', ''))
  }

  return { handleSubmit, validationSchema, initialValues }
}
