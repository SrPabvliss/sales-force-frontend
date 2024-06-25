import { IBrand } from '@/features/brands/models/IBrands'
import { ICategory } from '@/features/categories/models/ICategory'
import { IProduct } from '@/features/products/models/IProduct'
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
): ColumnDef<IProduct>[] => [
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
    accessorKey: 'category',
    header: 'Categoría',
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue('category') ? (row.getValue('category') as ICategory).name : 'Sin categoría'}
      </div>
    ),
  },
  {
    accessorKey: 'brand',
    header: 'Marca',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('brand') ? (row.getValue('brand') as IBrand).name : 'Sin marca'}</div>
    ),
  },
  {
    accessorKey: 'price',
    header: 'Precio',
    cell: ({ row }) => <div>{parseFloat(row.getValue('price')).toFixed(2)}</div>,
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: ({ row }) => <div>{row.getValue('stock')}</div>,
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
              Copiar el ID de la categoría
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
