'use client'

import Image from 'next/image'
import Link from 'next/link'

import notFoundImage from '@/public/notFound.png'

import { Button } from '@/components/ui/button'

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center  py-2">
      <div className="text-center">
        <Image src={notFoundImage} alt="404 Not Found" width={500} height={500} />
        <h1 className="mt-4 text-4xl font-bold text-purple-600">¡Vaya!</h1>
        <p className="text-md mt-2 ">La página que estás buscando no existe. Puede que haya sido movida o eliminada.</p>
        <Link href="/dashboard" passHref>
          <Button className="mt-6">Regresar al dashboard</Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
