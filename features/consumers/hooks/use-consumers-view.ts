import { usePathname, useRouter } from 'next/navigation'

import { useEffect } from 'react'

import { useConsumersStore } from '../context/consumers-store'

export function useConsumersView() {
  const router = useRouter()
  const pathname = usePathname()
  const { getAllConsumers, deleteConsumer, consumers } = useConsumersStore()

  useEffect(() => {
    getAllConsumers()
  }, [getAllConsumers])

  const handleDelete = async (id: number) => {
    await deleteConsumer(id)
  }

  const handleEdit = (id: number) => {
    router.push(`${pathname}/edit/${id}`)
  }

  const handleAdd = () => {
    router.push(`${pathname}/new`)
  }

  return {
    consumers,
    handleDelete,
    handleEdit,
    handleAdd,
  }
}
