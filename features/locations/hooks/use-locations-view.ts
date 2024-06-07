import { usePathname, useRouter } from 'next/navigation'

import { useEffect } from 'react'

import { useLocationsStore } from '../context/locations-store'

export function useLocationsView() {
  const router = useRouter()
  const pathname = usePathname()
  const { locations, getAllLocations, deleteLocation } = useLocationsStore()

  useEffect(() => {
    getAllLocations()
  }, [getAllLocations])

  const handleDelete = async (id: number) => {
    await deleteLocation(id)
  }

  const handleEdit = (id: number) => {
    router.push(`${pathname}/edit/${id}`)
  }

  const handleAdd = () => {
    router.push(`${pathname}/new`)
  }

  return {
    locations,
    handleDelete,
    handleEdit,
    handleAdd,
  }
}
