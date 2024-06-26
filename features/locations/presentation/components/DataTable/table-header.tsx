import { ILocation } from '@/features/locations/models/ILocation'
import { flexRender, Table } from '@tanstack/react-table'

import { TableHeader, TableRow, TableHead } from '@/components/ui/table'

const DataTableHeader = ({ table }: { table: Table<ILocation> }) => (
  <TableHeader>
    {table.getHeaderGroups().map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <TableHead key={header.id} className=" text-white">
            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
          </TableHead>
        ))}
      </TableRow>
    ))}
  </TableHeader>
)

export default DataTableHeader
