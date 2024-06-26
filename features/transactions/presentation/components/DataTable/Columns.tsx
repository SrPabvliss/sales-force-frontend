import { usePathname, useRouter } from 'next/navigation'

import { IItem } from '@/features/transactions/models/IItem'
import { ITransaction, TransactionStatus } from '@/features/transactions/models/ITransaction'
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
  handleStatusChange?: (id: number, status: TransactionStatus) => void,
): ColumnDef<ITransaction>[] => [
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
    accessorKey: 'items',
    header: 'Productos',
    cell: ({ row }) => (row.getValue('items') as IItem[]).length,
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ row }) => {
      return <div>{parseFloat(row.getValue('total')).toFixed(2)} </div>
    },
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) =>
      (() => {
        switch (row.getValue('status')) {
          case 'PAID':
            return <Badge variant="default">Completada</Badge>
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
    accessorKey: 'origin',
    header: 'Origen',
    cell: ({ row }) =>
      (() => {
        switch (row.getValue('origin')) {
          case 'SALE':
            return <Badge variant="default">Venta</Badge>
          case 'QUOTATION':
            return <Badge variant="secondary">Cotización</Badge>
          default:
            return <Badge variant="outline">Sin asignar</Badge>
        }
      })(),
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
      const transaction = row.original
      const router = useRouter()
      const pathname = usePathname()

      const statuses = [
        { label: 'Pendiente', value: TransactionStatus.PENDING },
        { label: 'Completada', value: TransactionStatus.PAID },
        { label: 'Cancelada', value: TransactionStatus.CANCELED },
      ]

      const filteredStatuses = statuses.filter((status) => status.value !== transaction.status)

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(transaction.id.toString())}>
              Copiar el ID de la tarea
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                router.push(`
                  ${pathname}/details/${transaction.id}
                  `)
              }
            >
              Detalles
            </DropdownMenuItem>
            {handleEdit && transaction.status !== TransactionStatus.PAID && (
              <>
                {handleStatusChange && (
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Estado</DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      {filteredStatuses.map((status) => (
                        <DropdownMenuItem
                          key={status.value}
                          onClick={() => handleStatusChange(transaction.id, status.value)}
                        >
                          Marcar como {status.label.toLowerCase()}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleEdit(transaction.id)}>Editar</DropdownMenuItem>
              </>
            )}
            {handleDelete && transaction.status !== TransactionStatus.PAID && (
              <>
                <ConfirmDialog
                  onConfirm={() => handleDelete(transaction.id)}
                  title="¿Estás seguro?"
                  description={'¿Estás seguro que deseas eliminar esta tarea?'}
                  isDestructive={true}
                >
                  <div className={`w-full rounded-sm px-2 py-1 text-start text-sm text-red-500 hover:bg-accent`}>
                    Eliminar
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
