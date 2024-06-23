import { usePathname, useRouter } from 'next/navigation'

import * as yup from 'yup'

import { useDelegationsStore } from '../context/delegations-store'
import { ICreateDelegation, IUpdateDelegation, IDelegation } from '../models/IDelegation'

export function useDelegationForm(currentDelegation?: IDelegation) {
  const { createDelegation, updateDelegation } = useDelegationsStore()
  const router = useRouter()
  const pathname = usePathname()

  const initialValues = {
    employeeId: currentDelegation?.employee.id.toString() || '',
    consumerId: currentDelegation?.consumer.id.toString() || '',
    locationId: currentDelegation?.consumer.person.location.id.toString() || '',
    isActive: currentDelegation?.isActive || true,
  }

  const validationSchema = yup.object().shape({
    employeeId: yup.string().required('El empleado es requerido'),
    consumerId: yup.string().required('El consumidor es requerido'),
    isActive: yup.boolean().required('El campo es requerido'),
  })

  const handleSubmit = async (data: ICreateDelegation | IUpdateDelegation) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { locationId, ...rest } = data as any
    const formattedData = {
      ...rest,
      employeeId: Number(data.employeeId),
      consumerId: Number(data.consumerId),
    }

    if (currentDelegation) {
      await updateDelegation(currentDelegation.id, formattedData as IUpdateDelegation)
      router.push(pathname.split('/').slice(0, -2).join('/'))
      return
    }

    await createDelegation(formattedData as ICreateDelegation)
    router.push(pathname.replace('/new', ''))
  }

  return { handleSubmit, validationSchema, initialValues }
}
