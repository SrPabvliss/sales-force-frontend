import { ITask, TaskStatus } from '@/features/tasks/models/ITask'
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
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu'

import ConfirmDialog from '../../../../../shared/components/confirm-dialog'

export const createColumns = (
  handleEdit?: (id: number) => void,
  handleDelete?: (id: number) => void,
  handleStatusChange?: (id: number, status: TaskStatus) => void,
): ColumnDef<ITask>[] => [
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
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) =>
      (() => {
        switch (row.getValue('status')) {
          case 'COMPLETED':
            return <Badge variant="default">Completada</Badge>
          case 'RESCHEDULED':
            return <Badge variant="outline">Reagendada</Badge>
          case 'CANCELED':
            return <Badge variant="destructive">Cancelada</Badge>
          case 'PENDING':
            return <Badge variant="secondary">Pendiente</Badge>
          default:
            return <Badge variant="outline">Sin asignar</Badge>
        }
      })(),
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row }) =>
      (() => {
        switch (row.getValue('type')) {
          case 'VISIT':
            return <Badge variant="default">Visita</Badge>
          case 'CALL':
            return <Badge variant="outline">Llamada</Badge>
          default:
            return <Badge variant="outline">Sin asignar</Badge>
        }
      })(),
  },
  {
    accessorKey: 'estimatedTime',
    header: 'Tiempo estimado',
    cell: ({ row }) => {
      return <div>{row.getValue('estimatedTime')} min</div>
    },
  },
  {
    accessorKey: 'date',
    header: 'Fecha',
    cell: ({ row }) => new Date(row.getValue('date')).toLocaleDateString(),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const task = row.original

      const statuses = [
        { label: 'Completada', value: TaskStatus.COMPLETED },
        { label: 'Reagendada', value: TaskStatus.RESCHEDULED },
        { label: 'Cancelada', value: TaskStatus.CANCELED },
        { label: 'Pendiente', value: TaskStatus.PENDING },
      ]

      const filteredStatuses = statuses.filter((status) => status.value !== task.status)

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(task.id.toString())}>
              Copiar el ID de la tarea
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {handleStatusChange && (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Estado</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {filteredStatuses.map((status) => (
                    <DropdownMenuItem key={status.value} onClick={() => handleStatusChange(task.id, status.value)}>
                      Marcar como {status.label.toLowerCase()}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            )}
            <DropdownMenuSeparator />
            {handleEdit && <DropdownMenuItem onClick={() => handleEdit(task.id)}>Editar</DropdownMenuItem>}
            <DropdownMenuSeparator />
            {handleDelete && (
              <ConfirmDialog
                onConfirm={() => handleDelete(task.id)}
                title="¿Estás seguro?"
                description={'¿Estás seguro que deseas eliminar esta tarea?'}
                isDestructive={true}
              >
                <div className={`w-full rounded-sm px-2 py-1 text-start text-sm text-red-500 hover:bg-accent`}>
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
