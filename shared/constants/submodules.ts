import { BarChart, FileText, MapPin, Package, ShoppingCart, Tag, Users } from 'lucide-react'

type variants = 'default' | 'ghost'

export const SUBMODULES = {
  1: {
    title: 'Administración',
    alias: 'admin',
    submodules: [
      {
        title: 'Marcas',
        icon: Tag,
        variant: 'ghost' as variants,
        alias: 'brands',
      },
      {
        title: 'Categorías',
        icon: Tag,
        variant: 'ghost' as variants,
        alias: 'categories',
      },
      {
        title: 'Consumidores',
        icon: Users,
        variant: 'ghost' as variants,
        alias: 'consumers',
      },
      {
        title: 'Usuarios',
        icon: Users,
        variant: 'ghost' as variants,
        alias: 'users',
      },
      {
        title: 'Ubicaciones',
        icon: MapPin,
        variant: 'ghost' as variants,
        alias: 'locations',
      },
      {
        title: 'Productos',
        icon: Package,
        variant: 'ghost' as variants,
        alias: 'products',
      },
      {
        title: 'Servicios',
        icon: ShoppingCart,
        variant: 'ghost' as variants,
        alias: 'services',
      },
    ],
  },
  2: {
    title: 'Supervisión',
    alias: 'superv',
    submodules: [
      {
        title: 'Ventas',
        icon: FileText,
        variant: 'ghost' as variants,
        alias: 'sales',
      },
      {
        title: 'Compras',
        icon: FileText,
        variant: 'ghost' as variants,
        alias: 'purchases',
      },
      {
        title: 'Productos',
        icon: FileText,
        variant: 'ghost' as variants,
        alias: 'products',
      },
      {
        title: 'Consumidores',
        icon: FileText,
        variant: 'ghost' as variants,
        alias: 'consumers',
      },
      {
        title: 'Ubicaciones',
        icon: FileText,
        variant: 'ghost' as variants,
        alias: 'locations',
      },
    ],
  },
  3: {
    title: 'Ventas',
    alias: 'ventas',
    submodules: [
      {
        title: 'Tareas',
        icon: BarChart,
        variant: 'ghost' as variants,
        alias: 'tasks',
      },
      {
        title: 'Oportunidades',
        icon: BarChart,
        variant: 'ghost' as variants,
        alias: 'opportunities',
      },
      {
        title: 'Productos',
        icon: BarChart,
        variant: 'ghost' as variants,
        alias: 'products',
      },
      {
        title: 'Consumidores',
        icon: BarChart,
        variant: 'ghost' as variants,
        alias: 'consumers',
      },
    ],
  },
}
