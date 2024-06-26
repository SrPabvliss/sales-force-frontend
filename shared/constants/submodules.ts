import {
  BarChart,
  Store,
  CircleDollarSign,
  Handshake,
  MapPin,
  Package,
  ShoppingCart,
  Tag,
  Users,
  SquareUserRound,
} from 'lucide-react'

import { IModule } from '../interfaces/IModule'

type variants = 'default' | 'ghost'

export const MODULES = {
  1: {
    name: 'Comunes',
    alias: 'comun',
    submodules: [
      {
        title: 'Consumidores',
        icon: Users,
        variant: 'ghost' as variants,
        alias: 'consumers',
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
      {
        title: 'Delegaciones',
        icon: Handshake,
        variant: 'ghost' as variants,
        alias: 'delegations',
      },
    ],
  } as IModule,
  2: {
    name: 'Administración',
    alias: 'admin',
    submodules: [
      {
        title: 'Empleados',
        icon: Users,
        variant: 'ghost' as variants,
        alias: 'employees',
      },
      {
        title: 'Cuotas',
        icon: CircleDollarSign,
        variant: 'ghost' as variants,
        alias: 'quotas',
      },
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
    ],
  } as IModule,
  3: {
    name: 'Supervisión',
    alias: 'superv',
    submodules: [
      {
        title: 'Ventas',
        icon: Store,
        variant: 'ghost' as variants,
        alias: 'sales_reports',
      },
      {
        title: 'Productos',
        icon: Package,
        variant: 'ghost' as variants,
        alias: 'products_reports',
      },
      {
        title: 'Consumidores',
        icon: Users,
        variant: 'ghost' as variants,
        alias: 'consumers_reports',
      },
      {
        title: 'Empleados',
        icon: SquareUserRound,
        variant: 'ghost' as variants,
        alias: 'employees_reports',
      },
    ],
  } as IModule,
  4: {
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
        alias: 'chances',
      },
      {
        title: 'Transacciones',
        icon: BarChart,
        variant: 'ghost' as variants,
        alias: 'transactions',
      },
    ],
  } as IModule,
}
