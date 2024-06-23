import { EmployeeRole } from '@/features/auth/models/IUser'
import { IEmployee } from '@/features/employees/models/IEmployee'
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
): ColumnDef<IEmployee>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="border border-white bg-white"
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
    accessorKey: 'person.dni',
    header: 'Cédula',
    cell: ({ row }) => {
      const person = row.original.person
      return person ? <div>{person.dni}</div> : <div>Sin DNI</div>
    },
  },
  {
    accessorKey: 'personFullName',
    header: 'Nombre',
    accessorFn: (row) => `${row.person.name} ${row.person.lastName}`,
    cell: ({ row }) => {
      const person = row.original.person
      return person ? <div>{`${person.name} ${person.lastName}`}</div> : <div>Sin Nombre</div>
    },
  },
  {
    accessorKey: 'username',
    header: 'Usuario',
    cell: ({ row }) => {
      const employee: IEmployee = row.original
      return <div>{employee.username}</div>
    },
  },
  {
    accessorKey: 'person.location.name',
    header: 'Ubicación',
    cell: ({ row }) => {
      const person = row.original.person
      const location = person?.location
      return location ? <div>{location.name}</div> : <div>Sin Ubicación</div>
    },
  },
  {
    accessorKey: 'role',
    header: 'Rol',
    cell: ({ row }) => {
      const employeeTypeLableMap: { [key in EmployeeRole]: string } = {
        [EmployeeRole.SELLER]: 'Vendedor',
        [EmployeeRole.SUPERVISOR]: 'Supervisor',
        [EmployeeRole.ADMIN]: 'Administrador',
      }

      return <div className="capitalize">{employeeTypeLableMap[row.original.role as EmployeeRole]}</div>
    },
  },
  {
    accessorKey: 'isActive',
    header: 'Activo',
    cell: ({ row }) =>
      row.original.isActive === true ? <Badge>Activo</Badge> : <Badge variant="outline">Inactivo</Badge>,
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
              Copiar el ID de la ubicación
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