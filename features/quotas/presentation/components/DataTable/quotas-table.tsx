'use client'

import { EmployeeRole } from '@/features/auth/models/IUser'
import { IQuota } from '@/features/quotas/models/IQuota'
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
import { Input } from '@/components/ui/input'
import { Table } from '@/components/ui/table'

import { UseAccountStore } from '../../../../auth/context/useUserStore'
import { createColumns } from './Columns'
import DataTableBody from './table-body'
import DataTableFooter from './table-footer'
import DataTableHeader from './table-header'

export const QuotasTable = ({
  data,
  handleEdit,
  handleDelete,
}: {
  data: IQuota[]
  handleEdit: (id: number) => void
  handleDelete: (id: number) => void
}) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [pageIndex, setPageIndex] = React.useState(0)
  const columns = React.useMemo(() => createColumns(handleEdit, handleDelete), [handleEdit, handleDelete])

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

  const handleNameFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value || ''
    table.getColumn('personFullName')?.setFilterValue(value)
  }

  const handleDniFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value || ''
    table.getColumn('dni')?.setFilterValue(value)
  }

  React.useEffect(() => {
    if (user?.role === EmployeeRole.SELLER) {
      table.getColumn('dni')?.setFilterValue(user?.person?.dni || '')
      table
        .getColumn('personFullName')
        ?.setFilterValue(`${user?.person?.name || ''} ${user?.person?.lastName || ''}`.trim() || '')
    }
  }, [user, table])

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 py-4">
        <Input
          placeholder="Filtra por cédula..."
          value={(table.getColumn('dni')?.getFilterValue() as string) ?? ''}
          onChange={handleDniFilterChange}
          className="max-w-sm"
          disabled={user?.role === EmployeeRole.SELLER}
        />
        <Input
          placeholder="Filtra por nombre..."
          value={(table.getColumn('personFullName')?.getFilterValue() as string) ?? ''}
          onChange={handleNameFilterChange}
          className="max-w-sm"
          disabled={user?.role === EmployeeRole.SELLER}
        />
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
