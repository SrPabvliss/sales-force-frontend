import { usePathname, useRouter } from 'next/navigation'

import { useLocationsStore } from '@/features/locations/context/locations-store'
import { useEffect } from 'react'

import { useEmployeesStore } from '../context/employees-store'

export function useEmployeesView() {
  const router = useRouter()
  const pathname = usePathname()
  const { getAllEmployees, deleteEmployee, employees } = useEmployeesStore()
  const { getAllLocations } = useLocationsStore()

  useEffect(() => {
    getAllLocations()
    getAllEmployees()
  }, [getAllEmployees, getAllLocations])

  const handleDelete = async (id: number) => {
    await deleteEmployee(id)
  }

  const handleEdit = (id: number) => {
    router.push(`${pathname}/edit/${id}`)
  }

  const handleAdd = () => {
    router.push(`${pathname}/new`)
  }

  return {
    employees,
    handleDelete,
    handleEdit,
    handleAdd,
  }
}
