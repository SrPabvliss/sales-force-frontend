import { usePathname, useRouter } from 'next/navigation'

import { useEffect } from 'react'

import { useTransactionsStore } from '../context/transactions-store'

export function useTransactionsView() {
  const router = useRouter()
  const pathname = usePathname()
  const { getAllTransactions, deleteTransaction, transactions } = useTransactionsStore()

  useEffect(() => {
    getAllTransactions()
  }, [getAllTransactions])

  const handleDelete = async (id: number) => {
    await deleteTransaction(id)
  }

  const handleEdit = (id: number) => {
    router.push(`${pathname}/edit/${id}`)
  }

  const handleAdd = () => {
    router.push(`${pathname}/new`)
  }

  return {
    transactions,
    handleDelete,
    handleEdit,
    handleAdd,
  }
}
