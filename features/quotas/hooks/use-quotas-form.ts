import { usePathname, useRouter } from 'next/navigation'

import * as yup from 'yup'

import { useQuotasStore } from '../context/quotas-store'
import { ICreateQuota, IQuota, IUpdateQuota } from '../models/IQuota'

export function useQuotasForm({ currentQuota }: { currentQuota?: IQuota }) {
  const { createQuota, updateQuota } = useQuotasStore()
  const router = useRouter()
  const pathname = usePathname()

  const initialValues = {
    employeeId: currentQuota?.employee.id.toString() || '',
    goal: currentQuota?.goal || 0,
    commission: currentQuota?.commission || 0,
    startDate: currentQuota?.startDate || new Date(),
    endDate: currentQuota?.endDate || new Date(new Date().setDate(new Date().getDate() + 30)),
    isActive: currentQuota?.isActive || true,
    isAchieved: currentQuota?.isAchieved || false,
  }

  const validationSchema = yup.object().shape({
    employeeId: yup.string().required('El empleado es requerido'),
    goal: yup.number().required('El valor de meta es requerido'),
    commission: yup
      .number()
      .required('La comisión porcentual es requerida')
      .min(1, 'La comision mínima es de 1%')
      .max(100, 'La comision máxima es de 100%'),
    startDate: yup.date().required('La fecha de inicio es requerida'),
    endDate: yup
      .date()
      .required('La fecha de fin es requerida')
      .min(yup.ref('startDate'), 'La fecha de fin debe ser mayor a la fecha de inicio'),
    isActive: yup.boolean().required('La cuota activa es requerida'),
    isAchieved: yup.boolean().required('La cuota completada es requerida'),
  })

  const handleSubmit = async (data: ICreateQuota | IUpdateQuota) => {
    const fomattedData = {
      ...data,
      employeeId: Number(data.employeeId),
    }

    if (currentQuota) {
      await updateQuota(currentQuota.id, fomattedData as IUpdateQuota)
      router.push(pathname.split('/').slice(0, -2).join('/'))
      return
    }

    await createQuota(fomattedData as ICreateQuota)
    router.push(pathname.replace('/new', ''))
  }

  return { handleSubmit, validationSchema, initialValues }
}
