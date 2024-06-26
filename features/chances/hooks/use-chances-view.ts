import { usePathname, useRouter } from 'next/navigation'

import { useConsumersStore } from '@/features/consumers/context/consumers-store'
import { useEmployeesStore } from '@/features/employees/context/employees-store'
import { useLocationsStore } from '@/features/locations/context/locations-store'
import { useEffect } from 'react'

import { useChancesStore } from '../context/chances-store'
import { ChanceStatus } from '../models/IChance'

export function useChancesView() {
  const router = useRouter()
  const pathname = usePathname()
  const { getAllChances, toggleStatus, chances, deleteChance } = useChancesStore()
  const { getAllEmployees } = useEmployeesStore()
  const { getAllConsumers } = useConsumersStore()
  const { getAllLocations } = useLocationsStore()

  useEffect(() => {
    getAllEmployees()
    getAllConsumers()
    getAllLocations()
    getAllChances()
  }, [getAllChances, getAllEmployees, getAllConsumers, getAllLocations])

  const updateChanceStatus = async (id: number, status: ChanceStatus | null) => {
    await toggleStatus(id, status)
  }

  const handleDelete = async (id: number) => {
    await deleteChance(id)
  }

  const handleAdd = () => {
    router.push(`${pathname}/new`)
  }

  return {
    chances,
    handleDelete,
    updateChanceStatus,
    handleAdd,
  }
}
