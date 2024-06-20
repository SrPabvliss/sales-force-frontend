import { usePathname, useRouter } from 'next/navigation'

import { useEffect } from 'react'

import { useQuotasStore } from '../context/quotas-store'

export function useQuotasView() {
  const router = useRouter()
  const pathname = usePathname()
  const { quotas, getAllQuotas, toggleActive } = useQuotasStore()

  useEffect(() => {
    getAllQuotas()
  }, [getAllQuotas])

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
