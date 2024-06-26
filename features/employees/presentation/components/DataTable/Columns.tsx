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
import { UseAccountStore } from '../../../../auth/context/useUserStore'

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
    accessorKey: 'dni',
    accessorFn: (row) => row.person.dni,
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
    accessorKey: 'location',
    header: 'Ubicación',
    accessorFn: (row) => row.person.location.name,
    cell: ({ row }) => {
      const person = row.original.person
      const location = person?.location
      return location ? <div>{location.name}</div> : <div>Sin Ubicación</div>
    },
  },
  {
    accessorKey: 'role',
    header: 'Rol',
    accessorFn: (row) => row.role,
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
      const employee = row.original
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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(employee.id.toString())}>
              Copiar el ID del empleado
            </DropdownMenuItem>
            {user?.role !== EmployeeRole.SELLER && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleEdit(employee.id)}>Editar</DropdownMenuItem>
                {user?.role === EmployeeRole.ADMIN && (
                  <ConfirmDialog
                    onConfirm={() => handleDelete(employee.id)}
                    title="¿Estás seguro?"
                    description={
                      employee.isActive
                        ? '¿Estás seguro que deseas desactivar este empleado?'
                        : '¿Estás seguro que deseas activar este empleado?'
                    }
                    isDestructive={employee.isActive}
                  >
                    <div
                      className={`w-full text-start text-sm ${
                        employee.isActive ? 'text-red-500' : 'text-green-600'
                      } rounded-sm px-2 py-1 hover:bg-accent`}
                    >
                      {employee.isActive ? 'Desactivar' : 'Activar'}
                    </div>
                  </ConfirmDialog>
                )}
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
