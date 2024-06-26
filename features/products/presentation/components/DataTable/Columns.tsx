import { UseAccountStore } from '@/features/auth/context/useUserStore'
import { EmployeeRole } from '@/features/auth/models/IUser'
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
    accessorFn: (row) => (row.category as ICategory).name,
    header: 'Categoría',
    cell: ({ row }) => <div className="capitalize">{row.getValue('category')}</div>,
  },
  {
    accessorKey: 'brand',
    accessorFn: (row) => (row.brand as IBrand).name,
    header: 'Marca',
    cell: ({ row }) => <div className="capitalize">{row.getValue('brand')}</div>,
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
      const product = row.original
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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(product.id.toString())}>
              Copiar el ID del producto
            </DropdownMenuItem>
            {user?.role !== EmployeeRole.SELLER && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleEdit(product.id)}>Editar</DropdownMenuItem>
                <ConfirmDialog
                  onConfirm={() => handleDelete(product.id)}
                  title="¿Estás seguro?"
                  description={
                    product.isActive
                      ? '¿Estás seguro que deseas desactivar este producto?'
                      : '¿Estás seguro que deseas activar este producto?'
                  }
                  isDestructive={product.isActive}
                >
                  <div
                    className={`w-full text-start text-sm ${
                      product.isActive ? 'text-red-500' : 'text-green-600'
                    } rounded-sm px-2 py-1 hover:bg-accent`}
                  >
                    {product.isActive ? 'Desactivar' : 'Activar'}
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
