import { usePathname, useRouter } from 'next/navigation'

import { useConsumersStore } from '@/features/consumers/context/consumers-store'
import { useDelegationsStore } from '@/features/delegations/context/delegations-store'
import { useEmployeesStore } from '@/features/employees/context/employees-store'
import { useEffect } from 'react'

import { useTasksStore } from '../context/tasks-store'
import { TaskStatus } from '../models/ITask'

export function useTasksView() {
  const router = useRouter()
  const pathname = usePathname()
  const { getAllTasks, deleteTask, updateTask, tasks } = useTasksStore()
  const { getAllEmployees, employees } = useEmployeesStore()
  const { getAllConsumers, consumers } = useConsumersStore()
  const { getAllDelegations } = useDelegationsStore()

  useEffect(() => {
    if (employees.length == 0) getAllEmployees()
    if (consumers.length === 0) getAllConsumers()
    getAllDelegations()
    getAllTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAllTasks, getAllEmployees, getAllConsumers, getAllDelegations])

  const handleDelete = async (id: number) => {
    await deleteTask(id)
  }

  const handleEdit = (id: number) => {
    router.push(`${pathname}/edit/${id}`)
  }

  const handleAdd = () => {
    router.push(`${pathname}/new`)
  }

  const handleStatusChange = async (id: number, status: TaskStatus) => {
    const newStatus = status === TaskStatus.PENDING ? null : status
    await updateTask(id, { status: newStatus } as any)
  }

  return {
    tasks,
    handleDelete,
    handleEdit,
    handleAdd,
    handleStatusChange,
  }
}
