'use client'

import { employeeTypeOptions } from '@/features/auth/models/IUser'
import { IEmployee } from '@/features/employees/models/IEmployee'
import { useLocationsStore } from '@/features/locations/context/locations-store'
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

export const EmployeesTable = ({
  data,
  handleEdit,
  handleDelete,
}: {
  data: IEmployee[]
  handleEdit: (id: number) => void
  handleDelete: (id: number) => void
}) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [pageIndex, setPageIndex] = React.useState(0)

  const [dniFilter, setDniFilter] = React.useState<string>('')
  const [nameFilter, setNameFilter] = React.useState<string>('')
  const [locationFilter, setLocationFilter] = React.useState<string>('ALL')
  const [roleFilter, setRoleFilter] = React.useState<string>('ALL')

  const { locations } = useLocationsStore()

  const columns = React.useMemo(() => createColumns(handleEdit, handleDelete), [handleEdit, handleDelete])

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

  const handleDniFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value || ''
    table.getColumn('dni')?.setFilterValue(value)
    setDniFilter(value)
  }

  const handleNameFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value || ''
    table.getColumn('personFullName')?.setFilterValue(value)
    setNameFilter(value)
  }

  const handleLocationFilterChange = (value: string) => {
    table.getColumn('location')?.setFilterValue(value === 'ALL' ? null : value)
    setLocationFilter(value)
  }

  const handleRoleFilterChange = (value: string) => {
    table.getColumn('role')?.setFilterValue(value === 'ALL' ? null : value)
    setRoleFilter(value)
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 py-4">
        <Input
          placeholder="Filtra por cédula..."
          value={dniFilter}
          onChange={handleDniFilterChange}
          className="max-w-sm"
        />
        <Input
          placeholder="Filtra por nombre..."
          value={nameFilter}
          onChange={handleNameFilterChange}
          className="max-w-sm"
        />

        <Select value={locationFilter} onValueChange={handleLocationFilterChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona una ubicación" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Ubicaciones</SelectLabel>
              <SelectItem value="ALL">Todas</SelectItem>
              {locations.map((location, index) => (
                <SelectItem key={index} value={location.name}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={roleFilter} onValueChange={handleRoleFilterChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona un rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Roles</SelectLabel>
              <SelectItem value="ALL">Todos</SelectItem>
              {employeeTypeOptions.map((role, index) => (
                <SelectItem key={index} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
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
