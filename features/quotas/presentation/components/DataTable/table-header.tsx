import { IQuota } from '@/features/quotas/models/IQuota'
import { flexRender, Table } from '@tanstack/react-table'

import { TableHeader, TableRow, TableHead } from '@/components/ui/table'

const DataTableHeader = ({ table }: { table: Table<IQuota> }) => (
  <TableHeader>
    {table.getHeaderGroups().map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => (
          <TableHead key={header.id}>
            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
          </TableHead>
        ))}
      </TableRow>
    ))}
  </TableHeader>
)

export default DataTableHeader
