'use client'

import { IConsumer } from '@/features/consumers/models/IConsumer'
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

export const ConsumersTable = ({
  data,
  handleEdit,
  handleDelete,
}: {
  data: IConsumer[]
  handleEdit: (id: number) => void
  handleDelete: (id: number) => void
}) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [pageIndex, setPageIndex] = React.useState(0)

  const [locationFilter, setLocationFilter] = React.useState<string>('ALL')
  const [typeFilter, setTypeFilter] = React.useState<string>('ALL')
  const [isCustomerFilter, setIsCustomerFilter] = React.useState<string>('ALL')

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

  // Funciones para manejar los cambios en los filtros
  const handleLocationFilterChange = (value: string) => {
    table.getColumn('personLocation')?.setFilterValue(value === 'ALL' ? null : value)
    setLocationFilter(value)
  }

  const handleTypeFilterChange = (value: string) => {
    table.getColumn('type')?.setFilterValue(value === 'ALL' ? null : value)
    setTypeFilter(value)
  }

  const handleIsCustomerFilterChange = (value: string) => {
    table.getColumn('isCustomer')?.setFilterValue(value === 'ALL' ? null : value)
    setIsCustomerFilter(value)
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 py-4">
        <Input
          placeholder="Filtra por nombre..."
          value={(table.getColumn('personFullName')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('personFullName')?.setFilterValue(event.target.value)}
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
              {locations.map((location) => (
                <SelectItem key={location.id} value={location.name}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={handleTypeFilterChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona un tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tipos</SelectLabel>
              <SelectItem value="ALL">Todos</SelectItem>
              <SelectItem value="NATURAL">Natural</SelectItem>
              <SelectItem value="COMPANY">Jurídico</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={isCustomerFilter} onValueChange={handleIsCustomerFilterChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona estado de cliente" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Cliente</SelectLabel>
              <SelectItem value="ALL">Todos</SelectItem>
              <SelectItem value="true">Cliente</SelectItem>
              <SelectItem value="false">No cliente</SelectItem>
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
