import { usePathname, useRouter } from 'next/navigation'

import * as yup from 'yup'

import { IPerson } from '../../../shared/interfaces/IPerson'
import { useConsumersStore } from '../context/consumers-store'
import { ConsumerType, IConsumer } from '../models/IConsumer'

export function useCategoriesForm(currentConsumer?: IConsumer) {
  const { createConsumer, updateConsumer } = useConsumersStore()
  const router = useRouter()
  const pathname = usePathname()

  const initialValues: Omit<IConsumer, 'id'> = {
    person: currentConsumer?.person || ({} as IPerson),
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
    if (currentConsumer) {
      await updateConsumer(currentConsumer.id, data)
      router.push(pathname.split('/').slice(0, -2).join('/'))
      return
    }
    await createConsumer(data)
    router.push(pathname.replace('/new', ''))
  }

  return { handleSubmit, validationSchema, initialValues }
}
