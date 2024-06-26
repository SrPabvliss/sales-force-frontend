import { usePathname, useRouter } from 'next/navigation'

import { useEffect } from 'react'

import { useServicesStore } from '../context/services-store'

export function useServicesView() {
  const router = useRouter()
  const pathname = usePathname()
  const { getAllServices, services, deleteService } = useServicesStore()

  useEffect(() => {
    getAllServices()
  }, [getAllServices])

  const handleDelete = async (id: number) => {
    await deleteService(id)
  }

  const handleEdit = (id: number) => {
    router.push(`${pathname}/edit/${id}`)
  }

  const handleAdd = () => {
    router.push(`${pathname}/new`)
  }

  return {
    services,
    handleDelete,
    handleEdit,
    handleAdd,
  }
}
