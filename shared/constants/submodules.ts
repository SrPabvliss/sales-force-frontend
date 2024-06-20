import { BarChart, CircleDollarSign, FileText, MapPin, Package, ShoppingCart, Tag, Users } from 'lucide-react'

import { IModule } from '../interfaces/IModule'

type variants = 'default' | 'ghost'

export const MODULES = {
  1: {
    name: 'Administración',
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
        title: 'Cuotas',
        icon: CircleDollarSign,
        variant: 'ghost' as variants,
        alias: 'quotas',
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
  } as IModule,
  2: {
    name: 'Supervisión',
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
  } as IModule,
  3: {
    name: 'Ventas',
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
  } as IModule,
}
