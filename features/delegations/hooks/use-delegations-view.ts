import { usePathname, useRouter } from 'next/navigation'

import { useEffect } from 'react'

import { useDelegationsStore } from '../context/delegations-store'

export function useDelegationsView() {
  const router = useRouter()
  const pathname = usePathname()
  const { getAllDelegations, toggleActive, delegations } = useDelegationsStore()

  useEffect(() => {
    getAllDelegations()
  }, [getAllDelegations])

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
