import { usePathname, useRouter } from 'next/navigation'

import { useConsumersStore } from '@/features/consumers/context/consumers-store'
import { useEmployeesStore } from '@/features/employees/context/employees-store'
import { useLocationsStore } from '@/features/locations/context/locations-store'
import { useEffect } from 'react'

import { useDelegationsStore } from '../context/delegations-store'

export function useDelegationsView() {
  const router = useRouter()
  const pathname = usePathname()
  const { getAllDelegations, toggleActive, delegations } = useDelegationsStore()
  const { getAllLocations } = useLocationsStore()
  const { getAllConsumers } = useConsumersStore()
  const { getAllEmployees } = useEmployeesStore()

  useEffect(() => {
    getAllDelegations()
    getAllLocations()
    getAllConsumers()
    getAllEmployees()
  }, [getAllDelegations, getAllLocations, getAllConsumers, getAllEmployees])

  const handleDelete = async (id: number) => {
    await toggleActive(id)
  }

  const handleEdit = (id: number) => {
    router.push(`${pathname}/edit/${id}`)
  }

  const handleAdd = () => {
    router.push(`${pathname}/new`)
  }

  return {
    delegations,
    handleDelete,
    handleEdit,
    handleAdd,
  }
}
