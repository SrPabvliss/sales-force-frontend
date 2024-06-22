import { IDelegation } from '@/features/delegations/models/IDelegation'
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
  handleEdit?: (id: number) => void,
  handleDelete?: (id: number) => void,
): ColumnDef<IDelegation>[] => [
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
    accessorFn: (row) => `${row.employee.person?.name} ${row.employee.person.lastName} - ${row.employee.person.dni}`,
    cell: ({ row }) => {
      return <div>{row.getValue('employee')}</div>
    },
  },
  {
    accessorKey: 'consumer',
    header: 'Consumidor',
    accessorFn: (row) => `${row.consumer.person.name} ${row.consumer.person.lastName} - ${row.consumer.person.dni}`,
    cell: ({ row }) => {
      return <div>{row.getValue('consumer')}</div>
    },
  },
  {
    accessorKey: 'isActive',
    header: 'Activo',
    cell: ({ row }) =>
      row.getValue('isActive') === true ? <Badge>Activo</Badge> : <Badge variant="outline">Inactivo</Badge>,
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
            {handleEdit && <DropdownMenuItem onClick={() => handleEdit(delegation.id)}>Editar</DropdownMenuItem>}
            {handleDelete && (
              <ConfirmDialog
                onConfirm={() => handleDelete(delegation.id)}
                title="¿Estás seguro?"
                description={
                  delegation.isActive
                    ? '¿Estás seguro que deseas desactivar esta delegación?'
                    : '¿Estás seguro que deseas activar esta delegación?'
                }
                isDestructive={delegation.isActive}
              >
                <div
                  className={`w-full text-start text-sm ${
                    delegation.isActive ? 'text-red-500' : 'text-green-600'
                  } rounded-sm px-2 py-1 hover:bg-accent`}
                >
                  {delegation.isActive ? 'Desactivar' : 'Activar'}
                </div>
              </ConfirmDialog>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
