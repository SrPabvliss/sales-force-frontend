import { usePathname, useRouter } from 'next/navigation'

import * as yup from 'yup'

import { useTasksStore } from '../context/transactions-store'
import { ICreateTask, IUpdateTask, ITask, TaskType } from '../models/ITransaction'
import { timeOptions } from '../presentation/components/time-selector'

export function useTasksForm(currentTask?: ITask) {
  const { createTransaction: createTask, updateTransaction: updateTask } = useTasksStore()
  const router = useRouter()
  const pathname = usePathname()

  const getClosestTime = (value: number, options: number[]): number => {
    return options.reduce((prev, curr) => (Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev))
  }

  const initialValues = {
    employeeId: currentTask?.delegation.employee.id.toString() || '',
    delegationId: currentTask?.delegation.id.toString() || '',
    type: currentTask?.type || '',
    date: currentTask?.date || new Date(),
    estimatedTime: currentTask?.estimatedTime ? getClosestTime(currentTask?.estimatedTime, timeOptions) : '',
  }

  const validationSchema = yup.object().shape({
    employeeId: yup.string().required('El empleado es requerido'),
    delegationId: yup.string().required('La delegación es requerida'),
    type: yup.string().required('El tipo de tarea es requerido'),
    date: yup.date().required('La fecha es requerida'),
    estimatedTime: yup.number().required('El tiempo estimado es requerido'),
  })
  const handleSubmit = async (data: ICreateTask | IUpdateTask) => {
    const formattedData = {
      estimatedTime: data.estimatedTime,
      type: data.type as TaskType,
      date: data.date as Date,
      delegationId: Number(data.delegationId),
    }

    if (currentTask) {
      await updateTask(currentTask.id, formattedData)
      router.push(pathname.split('/').slice(0, -2).join('/'))
      return
    }

    await createTask(formattedData)
    router.push(pathname.replace('/new', ''))
  }

  return { handleSubmit, validationSchema, initialValues }
}
