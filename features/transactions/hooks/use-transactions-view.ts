import { usePathname, useRouter } from 'next/navigation'

import { useConsumersStore } from '@/features/consumers/context/consumers-store'
import { useDelegationsStore } from '@/features/delegations/context/delegations-store'
import { useEmployeesStore } from '@/features/employees/context/employees-store'
import { useProductsStore } from '@/features/products/context/products-store'
import { useServicesStore } from '@/features/services-feature/context/services-store'
import { useTasksStore } from '@/features/tasks/context/tasks-store'
import { useEffect } from 'react'

import { useTransactionsStore } from '../context/transactions-store'
import { TransactionStatus } from '../models/ITransaction'

export function useTransactionsView() {
  const router = useRouter()
  const pathname = usePathname()
  const { getAllTransactions, deleteTransaction, transactions, updateTransaction } = useTransactionsStore()
  const { getAllEmployees, employees } = useEmployeesStore()
  const { getAllConsumers, consumers } = useConsumersStore()
  const { getAllDelegations } = useDelegationsStore()
  const { getAllProducts, products } = useProductsStore()
  const { getAllServices, services } = useServicesStore()
  const { getAllTasks } = useTasksStore()

  useEffect(() => {
    if (employees.length) getAllEmployees()
    if (consumers.length === 0) getAllConsumers()
    getAllDelegations()
    if (products.length === 0) getAllProducts()
    if (services.length === 0) getAllServices()
    getAllTasks()
    getAllTransactions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    getAllTransactions,
    getAllEmployees,
    getAllConsumers,
    getAllDelegations,
    getAllProducts,
    getAllServices,
    getAllTasks,
  ])

  const handleDelete = async (id: number) => {
    await deleteTransaction(id)
  }

  const handleEdit = (id: number) => {
    router.push(`${pathname}/edit/${id}`)
  }

  const handleAdd = () => {
    router.push(`${pathname}/new`)
  }

  const handleUpdateStatus = async (id: number, status: TransactionStatus) => {
    await updateTransaction(id, {
      status,
    })
  }

  return {
    transactions,
    handleDelete,
    handleEdit,
    handleAdd,
    handleUpdateStatus,
  }
}
