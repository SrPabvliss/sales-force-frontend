import { usePathname, useRouter } from 'next/navigation'

import { useEffect } from 'react'

import { useTasksStore } from '../context/transactions-store'
import { TaskStatus } from '../models/ITransaction'

export function useTasksView() {
  const router = useRouter()
  const pathname = usePathname()
  const { getAllTransactions: getAllTasks, deleteTransaction: deleteTask, updateTransaction: updateTask, tasks } = useTasksStore()

  useEffect(() => {
    getAllTasks()
  }, [getAllTasks])

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
