import { usePathname, useRouter } from 'next/navigation'

import * as yup from 'yup'

import { useChancesStore } from '../context/chances-store'
import { ICreateChance, IUpdateChance, IChance } from '../models/IChance'

export function useChancesForm(currentChance?: IChance) {
  const { createChance } = useChancesStore()
  const router = useRouter()
  const pathname = usePathname()

  const initialValues = {
    employeeId: currentChance?.delegation.employee.id.toString() || '',
    consumerId: currentChance?.delegation.consumer.id.toString() || '',
    amount: currentChance?.amount.toString() || '',
    date: currentChance?.date.toString() || new Date().toISOString(),
  }

  const validationSchema = yup.object().shape({
    employeeId: yup.string().required('El empleado es requerido'),
    consumerId: yup.string().required('El consumidor es requerido'),
    amount: yup.number().required('El monto es requerido'),
    date: yup.date().required('La fecha es requerida'),
  })

  const handleSubmit = async (data: ICreateChance | IUpdateChance) => {
    const formattedData = {
      amount: Number(data.amount),
      employeeId: Number(data.employeeId),
      consumerId: Number(data.consumerId),
      date: data.date,
    }

    // if (currentChance) {
    //   await updateChance(currentChance.id, formattedData as IUpdateChance)
    //   router.push(pathname.split('/').slice(0, -2).join('/'))
    //   return
    // }

    await createChance(formattedData as ICreateChance)
    router.push(pathname.replace('/new', ''))
  }

  return { handleSubmit, validationSchema, initialValues }
}
