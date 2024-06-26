import { ConsumerType, IConsumer } from '@/features/consumers/models/IConsumer'
import { ILocation } from '@/features/locations/models/ILocation'
import { IPerson } from '@/shared/interfaces/IPerson'
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
): ColumnDef<IConsumer>[] => [
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
    accessorKey: 'person',
    header: 'Cédula',
    cell: ({ row }) => {
      const person: IPerson = row.getValue('person')
      return <div>{person.dni}</div>
    },
  },
  {
    accessorKey: 'personFullName',
    accessorFn: (row) => `${row.person.name} ${row.person.lastName}`,
    header: 'Nombre',
    cell: ({ row }) => {
      const person: IPerson = row.getValue('person')
      return <div>{`${person.name}  ${person.lastName}`}</div>
    },
  },
  {
    accessorKey: 'personLocation',
    header: 'Ubicación',
    accessorFn: (row) => row.person.location.name,
    cell: ({ row }) => {
      const person: IPerson = row.getValue('person')
      const location: ILocation = person.location
      return <div>{location.name}</div>
    },
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row }) => {
      const typeLabelMap: { [key in ConsumerType]: string } = {
        [ConsumerType.NATURAL]: 'Natural',
        [ConsumerType.COMPANY]: 'Jurídico',
      }
      return <div className="capitalize">{typeLabelMap[row.getValue('type') as ConsumerType]}</div>
    },
  },
  {
    accessorKey: 'isCustomer',
    header: 'Cliente',
    accessorFn: (row) => row.isCustomer.toString(),
    cell: ({ row }) =>
      row.getValue('isCustomer') === 'true' ? <Badge>Cliente</Badge> : <Badge variant="outline">No cliente</Badge>,
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
      const category = row.original

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(category.id.toString())}>
              Copiar el ID del consumidor
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleEdit(category.id)}>Editar</DropdownMenuItem>
            <ConfirmDialog
              onConfirm={() => handleDelete(category.id)}
              title="¿Estás seguro?"
              description={
                category.isActive
                  ? '¿Estás seguro que deseas desactivar esta categoría?'
                  : '¿Estás seguro que deseas activar esta categoría?'
              }
              isDestructive={category.isActive}
            >
              <div
                className={`w-full text-start text-sm ${
                  category.isActive ? 'text-red-500' : 'text-green-600'
                } rounded-sm px-2 py-1 hover:bg-accent`}
              >
                {category.isActive ? 'Desactivar' : 'Activar'}
              </div>
            </ConfirmDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
