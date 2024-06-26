'use client'

import { UseAccountStore } from '@/features/auth/context/useUserStore'
import { EmployeeRole } from '@/features/auth/models/IUser'
import { useConsumersStore } from '@/features/consumers/context/consumers-store'
import { useEmployeesStore } from '@/features/employees/context/employees-store'
import { ITransaction, TransactionStatus } from '@/features/transactions/models/ITransaction'
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ChevronDown } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Table } from '@/components/ui/table'

import { createColumns } from './Columns'
import DataTableBody from './table-body'
import DataTableFooter from './table-footer'
import DataTableHeader from './table-header'

export const TransactionsTable = ({
  data,
  handleEdit,
  handleDelete,
  handleStatusChange,
}: {
  data: ITransaction[]
  handleEdit?: (id: number) => void
  handleDelete?: (id: number) => void
  handleStatusChange?: (id: number, status: TransactionStatus) => void
}) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [pageIndex, setPageIndex] = React.useState(0)

  const [employeeFilter, setEmployeeFilter] = React.useState<string>('ALL')
  const [consumerFilter, setConsumerFilter] = React.useState<string>('ALL')
  const [statusFilter, setStatusFilter] = React.useState<string>('ALL')
  const [originFilter, setOriginFilter] = React.useState<string>('ALL')

  const columns = React.useMemo(
    () => createColumns(handleEdit, handleDelete, handleStatusChange),
    [handleEdit, handleDelete, handleStatusChange],
  )
  const { employees } = useEmployeesStore()
  const { consumers } = useConsumersStore()
  const { user } = UseAccountStore()

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex,
        pageSize: rowsPerPage,
      },
    },
    manualPagination: true,
    pageCount: Math.ceil(data.length / rowsPerPage),
  })

  React.useEffect(() => {
    if (user?.role === EmployeeRole.SELLER) {
      const userFullName = `${user.person.name} ${user.person.lastName} - ${user.person.dni}`
      table.getColumn('employee')?.setFilterValue(userFullName)
      setEmployeeFilter(userFullName)
    }
  }, [table, user])

  const handleEmployeeFilterChange = (value: string) => {
    table.getColumn('employee')?.setFilterValue(value === 'ALL' ? null : value)
    setEmployeeFilter(value)
  }

  const handleConsumerFilterChange = (value: string) => {
    table.getColumn('consumer')?.setFilterValue(value === 'ALL' ? null : value)
    setConsumerFilter(value)
  }

  const handleStatusFilterChange = (value: string) => {
    table.getColumn('status')?.setFilterValue(value === 'ALL' ? null : value)
    setStatusFilter(value)
  }

  const handleOriginFilterChange = (value: string) => {
    table.getColumn('origin')?.setFilterValue(value === 'ALL' ? null : value)
    setOriginFilter(value)
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 py-4">
        <Select
          value={employeeFilter}
          onValueChange={handleEmployeeFilterChange}
          disabled={user?.role === EmployeeRole.SELLER}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona un empleado" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Empleados</SelectLabel>
              <SelectItem value="ALL">Todos</SelectItem>
              {employees.map((employee, index) => (
                <SelectItem
                  key={index}
                  value={`${employee.person.name} ${employee.person.lastName} - ${employee.person.dni}`}
                >
                  {`${employee.person.name} ${employee.person.lastName} - ${employee.person.dni}`}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={consumerFilter} onValueChange={handleConsumerFilterChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona un consumidor" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Consumidores</SelectLabel>
              <SelectItem value="ALL">Todos</SelectItem>
              {consumers.map((consumer, index) => (
                <SelectItem
                  key={index}
                  value={`${consumer.person.name} ${consumer.person.lastName} - ${consumer.person.dni}`}
                >
                  {`${consumer.person.name} ${consumer.person.lastName} - ${consumer.person.dni}`}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona un estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Estados</SelectLabel>
              <SelectItem value="ALL">Todos</SelectItem>
              <SelectItem value="PAID">Completada</SelectItem>
              <SelectItem value="CANCELED">Cancelada</SelectItem>
              <SelectItem value="PENDING">Pendiente</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={originFilter} onValueChange={handleOriginFilterChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona un origen" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Origen</SelectLabel>
              <SelectItem value="ALL">Todos</SelectItem>
              <SelectItem value="SALE">Venta</SelectItem>
              <SelectItem value="QUOTATION">Cotización</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columnas <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <DataTableHeader table={table} />
          <DataTableBody table={table} rowsPerPage={rowsPerPage} pageIndex={pageIndex} />
        </Table>
      </div>
      <DataTableFooter
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        pageCount={table.getPageCount()}
      />
    </div>
  )
}
