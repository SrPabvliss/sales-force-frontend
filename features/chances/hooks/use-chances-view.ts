import { usePathname, useRouter } from 'next/navigation'

import { useEffect } from 'react'

import { useChancesStore } from '../context/chances-store'
import { ChanceStatus } from '../models/IChance'

export function useChancesView() {
  const router = useRouter()
  const pathname = usePathname()
  const { getAllChances, toggleStatus, chances, deleteChance } = useChancesStore()

  useEffect(() => {
    getAllChances()
  }, [getAllChances])

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
