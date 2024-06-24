'use client'

import { UseAccountStore } from '@/features/auth/context/useUserStore'
import { EmployeeRole } from '@/features/auth/models/IUser'
import { useConsumersStore } from '@/features/consumers/context/consumers-store'
import { useEmployeesStore } from '@/features/employees/context/employees-store'
import { ITask, TaskStatus } from '@/features/tasks/models/ITask'
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

export const TasksTable = ({
  data,
  handleEdit,
  handleDelete,
  handleStatusChange,
}: {
  data: ITask[]
  handleEdit?: (id: number) => void
  handleDelete?: (id: number) => void
  handleStatusChange?: (id: number, status: TaskStatus) => void
}) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [pageIndex, setPageIndex] = React.useState(0)
  const [statusFilter, setStatusFilter] = React.useState<string>('ALL')
  const [typeFilter, setTypeFilter] = React.useState<string>('ALL')

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
    table.getColumn('employee')?.setFilterValue(user?.person.dni.toString())
    table.getColumn('consumer')?.setFilterValue(' ')
    table.getColumn('status')?.setFilterValue(null as unknown as string)
    table.getColumn('type')?.setFilterValue(null as unknown as string)
  }, [table, user?.person.dni])

  const handleStatusFilterChange = (value: string) => {
    table.getColumn('status')?.setFilterValue(value === 'ALL' ? null : value)
    setStatusFilter(value)
  }

  const handleTypeFilterChange = (value: string) => {
    table.getColumn('type')?.setFilterValue(value === 'ALL' ? null : value)
    setTypeFilter(value)
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="flex gap-4">
          {handleEdit && (
            <>
              <div>
                <Select
                  value={(table.getColumn('employee')?.getFilterValue() as string) ?? user?.person.dni.toString()}
                  onValueChange={(value) => {
                    table.getColumn('employee')?.setFilterValue(value)
                  }}
                  disabled={user?.role === EmployeeRole.SELLER}
                >
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder={'Selecciona un empleado'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Empleados</SelectLabel>
                      <SelectItem value=" ">Todos</SelectItem>
                      {employees.map((employee, index) => (
                        <SelectItem key={index} value={employee.person.dni.toString()}>
                          {`${employee.person.name} ${employee.person.lastName} - ${employee.person.dni}`}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select
                  value={table.getColumn('consumer')?.getFilterValue() as string}
                  onValueChange={(value) => {
                    table.getColumn('consumer')?.setFilterValue(value)
                  }}
                >
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder={'Selecciona un consumidor'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Consumidores</SelectLabel>
                      <SelectItem value=" ">Todos</SelectItem>
                      {consumers.map((consumer, index) => (
                        <SelectItem key={index} value={consumer.person.dni.toString()}>
                          {`${consumer.person.name} ${consumer.person.lastName} - ${consumer.person.dni}`}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder={'Selecciona un estado'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Estados</SelectLabel>
                      <SelectItem value="ALL">Todos</SelectItem>
                      <SelectItem value="COMPLETED">Completada</SelectItem>
                      <SelectItem value="RESCHEDULED">Reagendada</SelectItem>
                      <SelectItem value="CANCELED">Cancelada</SelectItem>
                      <SelectItem value="PENDING">Pendiente</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select value={typeFilter} onValueChange={handleTypeFilterChange}>
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder={'Selecciona un tipo'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Tipos</SelectLabel>
                      <SelectItem value="ALL">Todos</SelectItem>
                      <SelectItem value="VISIT">Visita</SelectItem>
                      <SelectItem value="CALL">Llamada</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
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
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
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
