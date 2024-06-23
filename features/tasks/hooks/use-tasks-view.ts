import { usePathname, useRouter } from 'next/navigation'

import { useEffect } from 'react'

import { useTasksStore } from '../context/tasks-store'
import { TaskStatus } from '../models/ITask'

export function useTasksView() {
  const router = useRouter()
  const pathname = usePathname()
  const { getAllTasks, deleteTask, updateTask, tasks } = useTasksStore()

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
