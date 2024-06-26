import { IEmployee } from '@/features/employees/models/IEmployee'
import { flexRender, Table } from '@tanstack/react-table'

import { TableBody, TableRow, TableCell } from '@/components/ui/table'

const DataTableBody = ({
  table,
  rowsPerPage,
  pageIndex,
}: {
  table: Table<IEmployee>
  rowsPerPage: number
  pageIndex: number
}) => (
  <TableBody>
    {table.getRowModel().rows.length ? (
      table
        .getRowModel()
        .rows.slice(pageIndex * rowsPerPage, (pageIndex + 1) * rowsPerPage)
        .map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
            ))}
          </TableRow>
        ))
    ) : (
      <TableRow>
        <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
          No se encontraron resultados.
        </TableCell>
      </TableRow>
    )}
  </TableBody>
)

export default DataTableBody
