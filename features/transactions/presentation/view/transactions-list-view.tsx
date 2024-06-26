import { Button } from '@/components/ui/button'

import { useTransactionsView } from '../../hooks/use-transactions-view'
import { TransactionsTable } from '../components/DataTable/transactions-table'
import { TableBreadCrumb } from '../components/table-breadcrumb'

export const TransactionListView = () => {
  const { transactions, handleDelete, handleAdd, handleEdit, handleUpdateStatus } = useTransactionsView()
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="h-3/5 w-3/4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Transacciones</h1>
            <Button onClick={() => handleAdd()}>Nueva transacción</Button>
          </div>
          <TableBreadCrumb />
          <div className="mt-4">
            <TransactionsTable
              data={transactions}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleStatusChange={handleUpdateStatus}
            />
          </div>
        </div>
      </div>
    </>
  )
}
