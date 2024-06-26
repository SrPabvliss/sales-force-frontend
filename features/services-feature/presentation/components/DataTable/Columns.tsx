import { UseAccountStore } from '@/features/auth/context/useUserStore'
import { EmployeeRole } from '@/features/auth/models/IUser'
import { IService } from '@/features/services-feature/models/IService'
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
  handleEdit: (id: number) => void,
  handleDelete: (id: number) => void,
): ColumnDef<IService>[] => [
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
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'pricePerHour',
    header: 'Precio por hora',
    cell: ({ row }) => (
      <div>
        {parseFloat(row.getValue('pricePerHour')).toFixed(2)} <span className="text-sm">/ hora</span>
      </div>
    ),
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
      const service = row.original
      const { user } = UseAccountStore()

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(service.id.toString())}>
              Copiar el ID del servicio
            </DropdownMenuItem>
            {user?.role !== EmployeeRole.SELLER && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleEdit(service.id)}>Editar</DropdownMenuItem>
                <ConfirmDialog
                  onConfirm={() => handleDelete(service.id)}
                  title="¿Estás seguro?"
                  description={
                    service.isActive
                      ? '¿Estás seguro que deseas desactivar este servicio?'
                      : '¿Estás seguro que deseas activar este servicio?'
                  }
                  isDestructive={service.isActive}
                >
                  <div
                    className={`w-full text-start text-sm ${
                      service.isActive ? 'text-red-500' : 'text-green-600'
                    } rounded-sm px-2 py-1 hover:bg-accent`}
                  >
                    {service.isActive ? 'Desactivar' : 'Activar'}
                  </div>
                </ConfirmDialog>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
