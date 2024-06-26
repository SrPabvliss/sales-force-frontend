'use client'

import Image from 'next/image'
import Link from 'next/link'

import unauthorizedImage from '@/public/holdUp.png'

import { Button } from '@/components/ui/button'

const UnauthorizedPage = () => {
  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center py-2">
      <div className="text-center">
        <Image src={unauthorizedImage} alt="Unauthorized" width={800} height={800} />
        <h1 className="mt-4 text-4xl font-bold text-purple-600">¡Alto ahí!</h1>
        <p className="text-md mt-2 text-gray-600">
          No tienes acceso a esta sección. Si necesitas acceder, por favor solicita permiso al administrador.
        </p>
        <Link href="/dashboard" passHref>
          <Button className="mt-6">Regresa al dashboard</Button>
        </Link>
      </div>
    </div>
  )
}

export default UnauthorizedPage
