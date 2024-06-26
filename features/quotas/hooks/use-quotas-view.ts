import { usePathname, useRouter } from 'next/navigation'

import { useEmployeesStore } from '@/features/employees/context/employees-store'
import { useEffect } from 'react'

import { useQuotasStore } from '../context/quotas-store'

export function useQuotasView() {
  const router = useRouter()
  const pathname = usePathname()
  const { quotas, getAllQuotas, toggleActive } = useQuotasStore()
  const { getAllEmployees } = useEmployeesStore()

  useEffect(() => {
    getAllEmployees()
    getAllQuotas()
  }, [getAllQuotas, getAllEmployees])

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
    quotas,
    handleDelete,
    handleEdit,
    handleAdd,
  }
}
