import { IChance } from '@/features/chances/models/IChance'
import { flexRender, Table } from '@tanstack/react-table'

import { TableHeader, TableRow, TableHead } from '@/components/ui/table'

const DataTableHeader = ({ table }: { table: Table<IChance> }) => (
  <TableHeader className="rounded-t-lg">
    {table.getHeaderGroups().map((headerGroup) => (
      <TableRow key={headerGroup.id} className="rounded-md">
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