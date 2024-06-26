'use client'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import { UseAccountStore } from '@/features/auth/context/useUserStore'
import { Users, BarChart, ShoppingCart, Settings } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import Welcome from '../../public/welcomeDash.png'

const modules = [
  {
    title: 'Comunes',
    description:
      'En este módulo se encuentran las funcionalidades comunes a todos los módulos. Realiza acciones como ver, editar y eliminar consumidores, entre otros.',
    icon: Users,
    href: '/comun/consumers',
  },
  {
    title: 'Administración',
    description:
      'En este módulo se encuentran las funcionalidades de administración de la aplicación. Realiza acciones como crear, editar y eliminar usuarios, entre otros.',
    icon: Settings,
    href: '/admin/employees',
  },
  {
    title: 'Supervisión',
    description:
      'En este módulo se encuentran las funcionalidades de supervisión de la aplicación. Realiza acciones como ver reportes, estadísticas, entre otros.',
    icon: BarChart,
    href: '/superv/sales_reports',
  },
  {
    title: 'Ventas',
    description:
      'En este módulo se encuentran las funcionalidades de ventas de la aplicación. Realiza acciones como crear, editar y eliminar tareas, transacciones, entre otros.',
    icon: ShoppingCart,
    href: '/ventas/tasks',
  },
]

const DashboardPage = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { user } = UseAccountStore()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-32 ">
      <Card className="mb-6 flex w-full items-center justify-between bg-purple-200 p-8 px-32 shadow-md dark:bg-purple-900">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {' '}
            Bienvenid@ de vuelta, {user?.person.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Mantén tu negocio al día con sales force.</p>
          <p className="text-gray-600 dark:text-gray-300">
            {new Date().toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <Image src={Welcome.src} alt="Welcome Illustration" width={200} height={200} />
      </Card>

      <div className="grid grid-cols-1 items-center justify-center gap-6 lg:grid-cols-2">
        {modules.map((module) => (
          <Card key={module.title} className="flex flex-col gap-4 bg-white p-4 shadow-md dark:bg-gray-800">
            <CardContent className="flex items-center justify-center gap-4">
              <div className="flex h-auto w-auto items-center justify-center rounded-full bg-purple-500 p-6">
                <module.icon className="h-10 w-10 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{module.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">{module.description}</p>
                <Button className="mt-4" variant="outline" onClick={() => router.push(`${pathname}${module.href}`)}>
                  Ir al módulo
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage
