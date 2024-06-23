import { ChanceStatus, IChance } from '@/features/chances/models/IChance'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

import ConfirmDialog from '../../../../../shared/components/confirm-dialog'

export const createColumns = (
  handleUpdateStatus?: (id: number, status: ChanceStatus | null) => void,
  handleDelete?: (id: number) => void,
): ColumnDef<IChance>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="border border-white bg-white "
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'employee',
    header: 'Empleado',
    accessorFn: (row) =>
      `${row.delegation.employee.person?.name} ${row.delegation.employee.person.lastName} - ${row.delegation.employee.person.dni}`,
    cell: ({ row }) => {
      return <div>{row.getValue('employee')}</div>
    },
  },
  {
    accessorKey: 'consumer',
    header: 'Consumidor',
    accessorFn: (row) =>
      `${row.delegation.consumer.person.name} ${row.delegation.consumer.person.lastName} - ${row.delegation.consumer.person.dni}`,
    cell: ({ row }) => {
      return <div>{row.getValue('consumer')}</div>
    },
  },
  {
    accessorKey: 'amount',
    header: 'Monto',
    cell: ({ row }) => {
      return <div>{row.getValue('amount')}</div>
    },
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => {
      switch (row.getValue('status')) {
        case ChanceStatus.WON:
          return <Badge variant="default">Ganada</Badge>
        case ChanceStatus.LOST:
          return <Badge variant="outline">Perdida</Badge>
        default:
          return <Badge variant="secondary">No asignado</Badge>
      }
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const delegation = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(delegation.id.toString())}>
              Copiar el ID de la delegación
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {handleUpdateStatus &&
              (delegation.status === ChanceStatus.WON ? (
                <>
                  <DropdownMenuItem onClick={() => handleUpdateStatus(delegation.id, ChanceStatus.LOST)}>
                    Marcar como perdida
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleUpdateStatus(delegation.id, null)}>
                    Marcar como no asignada
                  </DropdownMenuItem>
                </>
              ) : delegation.status === ChanceStatus.LOST ? (
                <>
                  <DropdownMenuItem onClick={() => handleUpdateStatus(delegation.id, ChanceStatus.WON)}>
                    Marcar como ganada
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleUpdateStatus(delegation.id, null)}>
                    Marcar como no asignada
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem onClick={() => handleUpdateStatus(delegation.id, ChanceStatus.WON)}>
                    Marcar como ganada
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleUpdateStatus(delegation.id, ChanceStatus.LOST)}>
                    Marcar como perdida
                  </DropdownMenuItem>
                </>
              ))}
            {handleDelete && (
              <ConfirmDialog
                onConfirm={() => handleDelete(delegation.id)}
                title="¿Estás seguro?"
                description={'¿Estás seguro que deseas eliminar esta delegación?'}
                isDestructive={true}
              >
                <div className={`'text-red-500' w-full rounded-sm px-2 py-1 text-start text-sm hover:bg-accent`}>
                  Eliminar
                </div>
              </ConfirmDialog>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
